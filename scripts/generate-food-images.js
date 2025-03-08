const fs = require('fs');
const path = require('path');

// Create the directory if it doesn't exist
const menuImagesDir = path.join(__dirname, '../public/images/menu');
if (!fs.existsSync(menuImagesDir)) {
  fs.mkdirSync(menuImagesDir, { recursive: true });
}

// Function to generate a more visually appealing SVG image with food icon
function generateFoodSVG(name, color, icon) {
  const svg = `<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad-${name}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color}88;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="120" height="120" rx="10" ry="10" fill="url(#grad-${name})" />
    <text x="60" y="90" font-family="Arial" font-size="12" font-weight="bold" fill="white" text-anchor="middle">${name}</text>
    <text x="60" y="60" font-family="Arial" font-size="40" fill="white" text-anchor="middle" dominant-baseline="middle">${icon}</text>
  </svg>`;
  
  return svg;
}

// Generate images for each food item with appropriate emoji icons
const foodItems = [
  { name: 'Garlic Bread', color: '#8B4513', icon: '🍞' },
  { name: 'Mozzarella Sticks', color: '#FFA500', icon: '🧀' },
  { name: 'Spaghetti', color: '#FF6347', icon: '🍝' },
  { name: 'Salmon', color: '#FA8072', icon: '🐟' }
];

foodItems.forEach(item => {
  const svg = generateFoodSVG(item.name, item.color, item.icon);
  const filename = item.name.toLowerCase().replace(/\s+/g, '-') + '.svg';
  const filePath = path.join(menuImagesDir, filename);
  
  fs.writeFileSync(filePath, svg);
  console.log(`Generated ${filePath}`);
});

console.log('All food images generated successfully!'); 