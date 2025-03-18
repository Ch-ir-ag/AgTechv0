# Interactive Supply Chain Map

This feature allows you to create an interactive map with clickable regions that display county-specific information for Lakeland Dairies.

## Quick Setup

1. Place your custom map image in the `public/images` directory with the name `ireland_map.jpg`
2. Access the map editor tool at `/map-editor` to configure your clickable regions
3. Copy the generated code and replace the default clickable areas in the `InteractiveSupplyChainMap.tsx` component

## Detailed Instructions

### Step 1: Add your custom map image

Put your map image in the public images folder:
- Path: `public/images/ireland_map.jpg`
- Recommended size: at least 800x800 pixels, with good resolution
- Format: JPG or PNG (if using PNG, update the code accordingly)

### Step 2: Configure your clickable regions

1. Navigate to `/map-editor` in your browser (e.g., http://localhost:3000/map-editor)
2. For each county/region you want to make clickable:
   - Enter the county name in the input field
   - Click on the map to place a rectangular region
   - Drag the region to position it precisely over the county
   - Use the resize handle (red dot) at the bottom-right to adjust the size
3. Once all regions are positioned correctly, click "Generate Code"
4. Copy the generated code to your clipboard

### Step 3: Update the component

1. Open the file: `src/app/components/InteractiveSupplyChainMap.tsx`
2. Find the `clickableAreas` array in the code
3. Replace it with the code you copied from the map editor
4. Update the `countyData` object with real data for each county

## Customizing the Data

Each county can display detailed information. To customize this data:

```typescript
// In InteractiveSupplyChainMap.tsx
const countyData: Record<string, CountyData> = {
  cavan: {
    id: 'cavan',
    name: 'Cavan',
    farms: 420,            // Number of farms
    avgYield: 27.3,        // Average yield in liters per cow
    totalVolume: 11466,    // Total volume in liters
    avgFat: 4.3,           // Average fat percentage
    avgProtein: 3.5        // Average protein percentage
  },
  // Add data for other counties...
};
```

## Adding More Counties

To add more counties beyond the initial set:

1. Add the county to the `countyData` object with all required fields
2. Use the map editor to create a clickable region for the new county
3. Update the `clickableAreas` array with the new county's coordinates

## Troubleshooting

- **Image not loading**: Make sure the image path is correct and the file exists in the public folder
- **Regions not responding**: Check the county IDs match between clickableAreas and countyData
- **Misaligned regions**: Use the map editor to adjust the position and size of the regions

## Advanced Customization

For more advanced shapes beyond rectangles, you can modify the `renderOverlays` function in the `InteractiveSupplyChainMap.tsx` file to support circles or polygons. 