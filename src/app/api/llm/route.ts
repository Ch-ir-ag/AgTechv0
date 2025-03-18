import { NextResponse } from 'next/server';

// The Hugging Face API function
async function queryHuggingFaceModel(query: string) {
  // Replace with your actual API key and model endpoint
  const HF_API_KEY = process.env.HUGGING_FACE_API_KEY || '';
  const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";
  
  // Debug: Check if we have an API key (don't log the full key for security)
  console.log(`API Key available: ${HF_API_KEY ? 'Yes (starts with: ' + HF_API_KEY.substring(0, 5) + '...)' : 'No'}`);
  
  if (!HF_API_KEY) {
    return { error: "Missing Hugging Face API key. Please check the README.md for setup instructions and add your API key to the environment variables." };
  }

  // Prepare the prompt in the format expected by the model
  const prompt = `<s>[INST] You are an AI assistant that specializes in dairy farming and milk production forecasting.
  
  For the following query, provide a VERY BRIEF response with:
  1. A 1-2 sentence explanation of how the factors mentioned would affect milk production
  2. A clear percentage change estimate (positive or negative) for milk yield
  
  Be extremely concise and always specify a percentage value.
  
  Query: ${query} [/INST]</s>`;

  try {
    // Use the actual API call
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${HF_API_KEY}`
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 256,
          temperature: 0.7,
          top_p: 0.95,
          do_sample: true
        }
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Hugging Face API error:", error);
      return { error: "Failed to get response from the model: " + JSON.stringify(error) };
    }

    const result = await response.json();
    return { result };
    
  } catch (error) {
    console.error("Error querying Hugging Face:", error);
    return { error: "An unexpected error occurred: " + (error instanceof Error ? error.message : String(error)) };
  }
}

// Extract a percentage change from the LLM response
function extractPercentageChange(text: string): number {
  console.log("Extracting percentage from:", text);
  const lowerText = text.toLowerCase();

  // Look for several formats of percentage patterns in the text
  // Format: "X%" or "X percent" or "X to Y percent" or "between X and Y percent"
  const patterns = [
    /(\-?\+?\d+(\.\d+)?)%/g,                                   // Simple percentage: 5% or -5%
    /(\-?\+?\d+(\.\d+)?)\s*percent/gi,                         // X percent
    /between\s*(\-?\+?\d+(\.\d+)?)\s*and\s*(\-?\+?\d+(\.\d+)?)\s*percent/gi, // between X and Y percent
    /(\-?\+?\d+(\.\d+)?)\s*to\s*(\-?\+?\d+(\.\d+)?)\s*percent/gi // X to Y percent
  ];
  
  // Try each pattern
  for (const regex of patterns) {
    const matches = [...text.matchAll(regex)];
    if (matches.length > 0) {
      if (regex === patterns[0] || regex === patterns[1]) {
        // Simple percentage case
        const percentage = parseFloat(matches[0][1]) / 100;
        
        // Check if the context indicates a decrease
        const nearbyText = text.substring(
          Math.max(0, text.indexOf(matches[0][0]) - 60),
          Math.min(text.length, text.indexOf(matches[0][0]) + matches[0][0].length + 60)
        ).toLowerCase();
        
        // If percentage is positive but context indicates decrease
        if (percentage > 0 && (
            nearbyText.includes("decrease") || 
            nearbyText.includes("decline") || 
            nearbyText.includes("reduce") || 
            nearbyText.includes("lower") ||
            nearbyText.includes("drop") ||
            nearbyText.includes("negative") ||
            nearbyText.includes("negatively impact") ||
            nearbyText.includes("less")
          )) {
          // Context indicates decrease but percentage is positive
          console.log("Detected positive percentage in decrease context, inverting to negative");
          return -Math.abs(percentage);
        }
        
        return percentage;
      } else {
        // Range case (between X and Y or X to Y) - use the average
        const firstValue = parseFloat(matches[0][1]);
        const secondValue = parseFloat(matches[0][3]);
        const avgPercentage = (firstValue + secondValue) / 200; // Average divided by 100
        
        // Check if the context indicates a decrease
        const nearbyText = text.substring(
          Math.max(0, text.indexOf(matches[0][0]) - 60),
          Math.min(text.length, text.indexOf(matches[0][0]) + matches[0][0].length + 60)
        ).toLowerCase();
        
        // If average percentage is positive but context indicates decrease
        if (avgPercentage > 0 && (
            nearbyText.includes("decrease") || 
            nearbyText.includes("decline") || 
            nearbyText.includes("reduce") || 
            nearbyText.includes("lower") ||
            nearbyText.includes("drop") ||
            nearbyText.includes("negative") ||
            nearbyText.includes("negatively impact") ||
            nearbyText.includes("less")
          )) {
          // Context indicates decrease but percentage is positive
          console.log("Detected positive percentage range in decrease context, inverting to negative");
          return -Math.abs(avgPercentage);
        }
        
        return avgPercentage;
      }
    }
  }
  
  // If no percentage is found, look for keywords to determine direction and magnitude
  
  // Detect if there's a mention of increase or decrease with an intensity modifier
  const hasIncrease = lowerText.includes('increase') || 
                     lowerText.includes('higher') || 
                     lowerText.includes('boost') ||
                     lowerText.includes('rise') ||
                     lowerText.includes('improve') ||
                     lowerText.includes('positive impact') ||
                     lowerText.includes('better');
  
  const hasDecrease = lowerText.includes('decrease') || 
                     lowerText.includes('lower') || 
                     lowerText.includes('reduce') ||
                     lowerText.includes('decline') ||
                     lowerText.includes('drop') ||
                     lowerText.includes('negative impact') ||
                     lowerText.includes('negatively impact') ||
                     lowerText.includes('less') ||
                     lowerText.includes('worse');
  
  // Detect intensity modifiers
  const hasSignificant = lowerText.includes('significant') || 
                         lowerText.includes('substantial') || 
                         lowerText.includes('considerable') ||
                         lowerText.includes('dramatic') ||
                         lowerText.includes('major');
  
  const hasMinimal = lowerText.includes('minimal') || 
                    lowerText.includes('slight') || 
                    lowerText.includes('small') ||
                    lowerText.includes('minor') ||
                    lowerText.includes('marginal');
  
  // Determine percentage based on the keywords
  if (hasIncrease && !hasDecrease) {
    if (hasSignificant) return 0.1;  // Significant increase: 10%
    if (hasMinimal) return 0.02;     // Minimal increase: 2%
    return 0.05;                     // Default increase: 5%
  } else if (hasDecrease && !hasIncrease) {
    if (hasSignificant) return -0.1; // Significant decrease: -10%
    if (hasMinimal) return -0.02;    // Minimal decrease: -2%
    return -0.05;                    // Default decrease: -5%
  } else if (hasDecrease && hasIncrease) {
    // If both are mentioned, look for which one appears first
    const firstIncrease = lowerText.indexOf(
      ['increase', 'higher', 'boost', 'rise', 'improve', 'positive', 'better']
        .filter(word => lowerText.includes(word))[0] || 'not found'
    );
    const firstDecrease = lowerText.indexOf(
      ['decrease', 'lower', 'reduce', 'decline', 'drop', 'negative', 'less', 'worse']
        .filter(word => lowerText.includes(word))[0] || 'not found'
    );
    
    if (firstIncrease !== -1 && (firstDecrease === -1 || firstIncrease < firstDecrease)) {
      // Increase mentioned first or only increase found
      return hasSignificant ? 0.1 : (hasMinimal ? 0.02 : 0.05);
    } else {
      // Decrease mentioned first or only decrease found
      return hasSignificant ? -0.1 : (hasMinimal ? -0.02 : -0.05);
    }
  }
  
  console.log("No percentage change detected, defaulting to 0");
  return 0; // No change if no clear indication
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query } = body;
    
    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }
    
    console.log("Processing query:", query);
    const llmResponse = await queryHuggingFaceModel(query);
    let percentageChange = 0;
    let response = "";
    
    if ('result' in llmResponse) {
      console.log("Raw LLM response:", JSON.stringify(llmResponse.result));
      
      // Check if the result is in the expected format
      if (Array.isArray(llmResponse.result) && llmResponse.result.length > 0 && llmResponse.result[0].generated_text) {
        const generatedText = llmResponse.result[0].generated_text;
        
        // Extract the model's response part (after the prompt)
        const promptEndMarker = "[/INST]</s>";
        let responseText = "";
        
        if (generatedText.includes(promptEndMarker)) {
          // If the format matches what we expect, split at the end marker
          responseText = generatedText.split(promptEndMarker)[1].trim();
        } else {
          // If the format doesn't match, just use the whole response
          responseText = generatedText;
        }
        
        response = responseText;
        percentageChange = extractPercentageChange(responseText);
        console.log(`Extracted percentage change: ${percentageChange * 100}%`);
      } else {
        console.error("Unexpected response format:", llmResponse.result);
        response = "The model returned an unexpected format. Please try a different query.";
      }
    } else if ('error' in llmResponse) {
      console.error("Error from LLM function:", llmResponse.error);
      response = `Error: ${llmResponse.error}`;
    } else {
      response = "Sorry, I couldn't process your query at this time.";
    }
    
    return NextResponse.json({ 
      response, 
      percentageChange,
      success: true 
    });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json({ error: "Failed to process query" }, { status: 500 });
  }
} 