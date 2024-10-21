# Models Documentation

This document provides an overview of the data models used in the Audio Sample Project.

## Table of Contents
1. [User](#user)
2. [BlogPost](#blogpost)
3. [SiteSettings](#sitesettings)
4. [RevokedToken](#revokedtoken)

## User

The User model represents registered users in the system.

### Schema

| Field | Type | Description |
|-------|------|-------------|
| username | String | Required, unique, 3-30 characters |
| email | String | Required, unique |
| password | String | Required, hashed |
| role | String | User role, enum: ['user', 'admin'], default: 'user' |
| profilePicture | String | Optional, URL of the user's profile picture |
| isActive | Boolean | Indicates if the user account is active |

### Methods

- `comparePassword(candidatePassword)`: Compares a given password with the stored hashed password

## BlogPost

The BlogPost model represents blog posts created by users.

### Schema

| Field | Type | Description |
|-------|------|-------------|
| title | String | Required, 2-200 characters |
| content | [Object] | Required, array of content objects |
| author | ObjectId | Required, reference to the User who created the post |
| createdAt | Date | Automatically set to the current date |
| updatedAt | Date | Automatically updated when the document is modified |

## SiteSettings

The SiteSettings model represents global site settings.

### Schema

| Field | Type | Description |
|-------|------|-------------|
| siteName | String | Required |
| siteDescription | String | Required |
| siteKeywords | [String] | Array of keywords for SEO |
| socialMediaLinks | Object | Social media profile links |
| logoUrl | String | URL of the site logo |

## RevokedToken

The RevokedToken model keeps track of revoked JWT tokens.

### Schema

| Field | Type | Description |
|-------|------|-------------|
| token | String | Required, unique, the revoked token |
| expiresAt | Date | Required, expiration date of the token |

## Best Practices and Notes

1. **Data Validation**: All models include built-in validation for fields like required fields, string lengths, and valid URLs.

2. **Security**: 
   - User passwords are hashed before storage.
   - JWT tokens can be revoked for enhanced security.

3. **Scalability**: 
   - The BlogPost model uses a flexible content structure to allow for different types of content (text, images, etc.).

4. **Flexibility**:
   - The SiteSettings model allows for easy management of global site settings.

5. **Maintenance**:
   - All models use timestamps for tracking creation and update times.
   - The RevokedToken model includes an expiration date to allow for automatic cleanup of old entries.