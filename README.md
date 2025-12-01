# Car Sales App Backend

AWS Amplify Gen2 backend for a car sales website with admin authentication and car ad management.

## Features

- **Admin Authentication**: Email-based login for administrators
- **Car Ad Management**: Full CRUD operations for car advertisements
- **Image Storage**: S3 storage for car images
- **Public Access**: Guests can view car ads without authentication

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development environment:
```bash
npm run dev
```

3. Create an admin user:
   - Sign up through the authentication flow
   - Manually add the user to the 'admins' group in AWS Cognito console

## Data Model

### CarAd
- `title` (required): Car advertisement title
- `description`: Detailed description
- `price` (required): Price in currency units
- `year` (required): Manufacturing year
- `make` (required): Car manufacturer
- `model` (required): Car model
- `mileage`: Odometer reading
- `fuelType`: Fuel type (gasoline, diesel, electric, etc.)
- `transmission`: Transmission type (manual, automatic)
- `color`: Car color
- `images`: Array of image URLs
- `contactEmail`: Contact email
- `contactPhone`: Contact phone number
- `isActive`: Whether the ad is active (default: true)

## Authorization

- **Admins**: Full CRUD access to all car ads
- **Guests**: Read-only access to active car ads
- **Storage**: Authenticated users can upload/manage images, guests can view

## API Operations

### For Admins (authenticated users in 'admins' group):
- Create car ads
- Update existing ads
- Delete ads
- List all ads

### For Public (guests):
- List active car ads
- View individual car ad details

## Deployment

Deploy to AWS:
```bash
npm run deploy
```
