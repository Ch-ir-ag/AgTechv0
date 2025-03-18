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
  
  For the following query, return:
  1. An explanation of how the factors mentioned would affect milk production
  2. A percentage change estimate (positive or negative) for milk yield
  
  Query: ${query} [/INST]</s>`;

  try {
    // For debugging, simulate a successful response
    // Comment this out when you want to use the actual API
    const mockResponse = {
      result: [{
        generated_text: `<s>[INST] You are an AI assistant that specializes in dairy farming and milk production forecasting.
  
  For the following query, return:
  1. An explanation of how the factors mentioned would affect milk production
  2. A percentage change estimate (positive or negative) for milk yield
  
  Query: ${query} [/INST]</s>
  
  1. Explanation: An increase in rainfall by 50% next week would likely have a positive impact on milk production. Increased rainfall leads to better pasture growth, which provides more nutritious feed for dairy cows. Better quality and quantity of feed directly correlates with improved milk production. The fresh grass growth stimulated by rainfall contains more nutrients and is more digestible than dried forage, leading to higher milk yields. However, the full effects might take some time to manifest, as the pasture needs time to grow after the rainfall.

  2. Percentage change estimate: Based on historical data and research, a 50% increase in rainfall could result in approximately a 3-5% increase in milk yield in the short term. This assumes that the increased rainfall doesn't lead to flooding or other adverse conditions that could stress the animals.`
      }]
    };
    
    // Uncomment this section and remove the mockResponse when your API key is working
    /*
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
    */
    
    // Return the mock response for now
    console.log("Using mock response for development");
    return mockResponse;
    
  } catch (error) {
    console.error("Error querying Hugging Face:", error);
    return { error: "An unexpected error occurred: " + (error instanceof Error ? error.message : String(error)) };
  }
}

// Extract a percentage change from the LLM response
function extractPercentageChange(text: string): number {
  // Look for percentage patterns in the text
  const percentageRegex = /(\-?\+?\d+(\.\d+)?)%/g;
  const matches = [...text.matchAll(percentageRegex)];
  
  if (matches.length > 0) {
    // Use the first percentage found
    return parseFloat(matches[0][1]) / 100;
  }
  
  // If no percentage is found, look for keywords
  const lowerText = text.toLowerCase();
  if (lowerText.includes('increase') || lowerText.includes('higher') || lowerText.includes('boost')) {
    return 0.05; // Default 5% increase
  } else if (lowerText.includes('decrease') || lowerText.includes('lower') || lowerText.includes('reduce')) {
    return -0.05; // Default 5% decrease
  }
  
  return 0; // No change if no clear indication
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query } = body;
    
    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }
    
    const llmResponse = await queryHuggingFaceModel(query);
    let percentageChange = 0;
    let response = "";
    
    if ('result' in llmResponse) {
      const generatedText = llmResponse.result[0].generated_text;
      // Extract the model's response part (after the prompt)
      const promptEndMarker = "[/INST]</s>";
      const responseText = generatedText.includes(promptEndMarker) 
        ? generatedText.split(promptEndMarker)[1].trim()
        : generatedText;
      
      response = responseText;
      percentageChange = extractPercentageChange(responseText);
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