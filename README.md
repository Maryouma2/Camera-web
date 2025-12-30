# React Photo Gallery App

A modern, responsive photo gallery application built with React, Vite, and React Router. Features authentication, CRUD operations, search functionality, and a beautiful glassmorphism UI.

## 🚀 Features

- User authentication (Login/Signup)
- Photo gallery with grid layout
- Search photos by caption
- Edit and delete photos
- Responsive design
- Modern glassmorphism UI
- Mock data for development

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Routing**: React Router v6
- **Styling**: CSS with modern design
- **HTTP Client**: Axios
- **State Management**: React Context API

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Building for Production

```bash
npm run build
```

This creates a `dist` folder with the production build.

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it as a Vite project

2. **Environment Variables:**
   Set these in Vercel dashboard (Project Settings > Environment Variables):
   ```
   VITE_API_BASE_URL=https://your-api-url.com/api
   VITE_APP_NAME=React Photo Gallery
   VITE_APP_VERSION=1.0.0
   ```

3. **Deploy:**
   - Push to your main branch or deploy manually
   - Vercel will build and deploy automatically

### Netlify Deployment

1. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder or connect your Git repository

2. **Build Settings:**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Environment Variables:**
   Set in Netlify dashboard (Site settings > Environment variables):
   ```
   VITE_API_BASE_URL=https://your-api-url.com/api
   VITE_APP_NAME=React Photo Gallery
   VITE_APP_VERSION=1.0.0
   ```

4. **Deploy:**
   - Netlify will build and deploy automatically

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Upload the `dist` folder contents to your hosting provider (Netlify, Vercel, AWS S3, etc.)

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Base URL for API calls | `https://jsonplaceholder.typicode.com` |
| `VITE_APP_NAME` | Application name | `React Photo Gallery` |
| `VITE_APP_VERSION` | Application version | `1.0.0` |

## 🧪 Testing the Deployed Site

### With Mock Data
1. The app uses mock data by default
2. Test all routes: `/`, `/login`, `/signup`, `/gallery`
3. Verify authentication flow
4. Test search functionality
5. Check responsive design on mobile

### API Integration Testing
When connecting to a real API:
1. Update `VITE_API_BASE_URL` in environment variables
2. Test login/signup with real credentials
3. Verify photo CRUD operations work with backend
4. Check error handling for API failures

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🎨 Design Features

- **Glassmorphism UI**: Modern transparent elements with blur effects
- **Responsive Grid**: Adapts to different screen sizes
- **Gradient Buttons**: Vibrant color scheme with hover effects
- **Smooth Animations**: Fade-in and slide-in transitions
- **Accessibility**: Proper focus states and ARIA labels

## 🔒 Security Notes

- Environment variables are properly prefixed with `VITE_` for client-side access
- No sensitive data is exposed to the client
- Authentication tokens should be handled securely in production

## 📝 License

This project is licensed under the MIT License.