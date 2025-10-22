// Generate an SVG avatar with user's initial on a colored background
export function generateInitialAvatar(fullName, size = 64) {
  const initial = fullName && typeof fullName === 'string' 
    ? fullName.trim().charAt(0).toUpperCase() 
    : '?';

  // Generate a consistent color based on the name
  const colors = [
    '#2563eb', // blue-600
    '#dc2626', // red-600
    '#059669', // emerald-600
    '#7c3aed', // violet-600
    '#ea580c', // orange-600
    '#0891b2', // cyan-600
    '#c026d3', // fuchsia-600
  ];
  
  // Use the initial's char code to pick a consistent color
  const colorIndex = initial.charCodeAt(0) % colors.length;
  const bg = colors[colorIndex];
  const fg = '#ffffff'; // white text
  
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="100%" height="100%" fill="${bg}" rx="8" ry="8"/>
      <text 
        x="50%" 
        y="50%" 
        dy=".35em" 
        text-anchor="middle" 
        fill="${fg}"
        font-family="Arial, Helvetica, sans-serif" 
        font-size="${size/2}px"
        font-weight="bold"
      >${initial}</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}