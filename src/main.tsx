import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Starting SkillSphere application...');

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  
  console.log('Root element found, creating React root...');
  const root = createRoot(rootElement);
  
  console.log('Rendering App component...');
  root.render(<App />);
  
  console.log('App rendered successfully!');
} catch (error) {
  console.error('Error starting application:', error);
  document.body.innerHTML = `
    <div style="padding: 20px; background: white; color: black;">
      <h1>Error Loading SkillSphere</h1>
      <p>There was an error loading the application:</p>
      <pre>${error}</pre>
    </div>
  `;
}
