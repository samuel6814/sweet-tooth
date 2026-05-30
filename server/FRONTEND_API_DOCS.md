# Fix My Teeth - Frontend Integration Guide

This document outlines how the React frontend should interact with the Headless Laravel API.

## Base URL
In production, prefix all endpoints with the production domain. Locally, use:
`http://fix-my-teeth.test/`

All endpoints are publicly accessible. No authentication tokens are required.

---

## 1. Fetch Products List
**Endpoint:** `GET /api/restify/products`

Retrieves the list of dental products (e.g., floss, toothpaste, braces) managed by the dentist via the CMS. 

**Response Shape (Success):**
```json
{
  "meta": {
    "current_page": 1,
    "total": 12
  },
  "data": [
    {
      "id": "1",
      "type": "products",
      "attributes": {
        "name": "Electric Toothbrush",
        "category": "Hygiene",
        "price": 49.99,
        "purchase_link": "https://example.com/buy",
        "image_url": "https://example.com/img.png"
      }
    }
  ]
}
```

---

## 2. Submit Teeth Scan for AI Analysis
**Endpoint:** `POST /api/restify/teeth-scans`

Uploads a user's teeth photo. The backend will instantly pass it to the Gemini AI Agent and return a deterministic JSON payload containing visual observations and recommended products.

**Important details:**
- **Timeout:** The AI request takes up to 8 seconds. Please show a loading spinner on the frontend.
- **Content-Type:** Must be `multipart/form-data`.
- **Throttling:** Limited to 5 requests per minute per IP address.

**Request payload (FormData):**
- `image`: The actual image file (JPEG, PNG, WEBP).

**React Fetch Example:**
```javascript
const formData = new FormData();
formData.append('image', fileInputRef.current.files[0]);

const response = await fetch('http://fix-my-teeth.test/api/restify/teeth-scans', {
    method: 'POST',
    body: formData,
    headers: {
        'Accept': 'application/json'
    }
});
const result = await response.json();

if (result.status === 'error') {
    alert(result.message); // Will contain friendly message
    return;
}

// Proceed with result.data...
```

**Response Shape (Success OR Fallback):**
```json
{
  "status": "success", 
  "message": null,
  "data": {
    "enamel_coloration": "uniform",
    "gum_tissue_color": "light_pink",
    "gum_inflammation_visible": false,
    "calculus_or_plaque_visible": false,
    "visible_chips_or_cracks": false,
    "crowding_or_spacing_issues": false,
    "gum_recession_signs": false,
    "visual_summary": "Teeth appear generally healthy with no visible plaque.",
    "recommended_products": ["1", "3"] // ID references to products
  },
  "disclaimer": "Always cross-check visual observations with a professional dentist."
}
```
*(Note: If the AI fails or times out, the `status` will simply change to `"fallback"`, `message` will contain a friendly excuse string, and `data` will contain safe, generic defaults. Your frontend logic can safely treat `"success"` and `"fallback"` identically when rendering the UI).*

---

## Error Handling

All backend errors (Validation, Throttling, 404s, Server Errors) are guaranteed to return this strict envelope:

```json
{
  "status": "error",
  "message": "Friendly summary of the error.",
  "details": {
    "image": ["The image must be a file of type: jpeg, png, jpg, webp."]
  }
}
```

### Common HTTP Status Codes
- `200 OK`: Request succeeded (Check `status` property for `success` vs `fallback`).
- `422 Unprocessable Entity`: Validation failed (e.g., no image uploaded, or file is not an image).
- `429 Too Many Requests`: Throttling triggered (Wait 1 minute).
- `500 Internal Server Error`: Backend crash.
