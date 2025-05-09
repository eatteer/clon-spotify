# Clon Spotify

## Screenshots

### Desktop
![image](https://github.com/user-attachments/assets/ee490bcb-c5b4-4fbc-b333-e373680d2349)
![image](https://github.com/user-attachments/assets/dfe00687-b084-4d3f-ae31-331a5bdb328e)
![image](https://github.com/user-attachments/assets/1ebc6053-ef7a-4d49-b629-227b97f1998b)
![image](https://github.com/user-attachments/assets/d968357c-e34d-4dac-9eca-bd780d6e6887)
![image](https://github.com/user-attachments/assets/6d0a671f-a2c9-43c6-895c-ecd78e63c96e)

### Mobile

![image](https://github.com/user-attachments/assets/863184ec-a14a-4d60-a39e-89cf1d07e0e2)
![image](https://github.com/user-attachments/assets/940c3dad-7792-4ce3-b509-28d3c0d1dc30)
![image](https://github.com/user-attachments/assets/7ebcdf08-6960-46ad-ac27-e61ff23004e4)
![image](https://github.com/user-attachments/assets/d2abd74e-7e4b-4609-a0e6-d3dbf0ac8ad5)
![image](https://github.com/user-attachments/assets/b85f3dee-1f81-4d05-9647-b0c5bbf3ff04)

## Considerations

1. I did not complete all the playlist management task. I'm just showing the user playlist.
2. I did not use guards since every route is public, but their use was planned for the playlist managemenet task.
3. It took me about 12 hours to complete this project, not counting project setup and researching the Spotify API documentation.

## Inspiration

I used the Spotify Web Application (Mobile and Desktop), the Spotify Mobile Application and the following Figma resources for inspiration, but did not follow them to the letter:

- [Spotify UI - Free UI Kit (Recreated) (Community)](https://www.figma.com/design/N1qfVzyCk7v2KG5cnGsLsN/Spotify-UI---Free-UI-Kit--Recreated---Community-?node-id=0-1890&t=d0YdknV6ZXuvERlS-0)

- [Spotify - Mobile UI Kit (Community)](https://www.figma.com/design/c9TtnkvCzlHvxUQoKdvWk6/Spotify---Mobile-UI-Kit--Community-?node-id=0-1&p=f&t=XhsF9OFv2NlvTlxR-0)

## Recommendations

1. Use pnpm when developing

## Production

Make sure you have Docker installed.

Duplicate the `src/environments/environment.example.ts` file and rename it to `src/environments/environment.ts`, then replace the port of the `SPOTIFY_REDIRECT_URI` from `8000` to `80`.

```typescript
export const environment = {
  // Rest of the environment variables
  // SPOTIFY_REDIRECT_URI: 'http://127.0.0.1:8000/callback',
  SPOTIFY_REDIRECT_URI: 'http://127.0.0.1:80/callback',
};
```

Go to your Spotify App in your Spotify Dashboard and:

1. Add to the `Redirect URIs` list the `SPOTIFY_REDIRECT_URI` value as it is in the `environment.ts` file.
2. Copy the `Client ID` and `Client secret` and paste them in the `src/environments/environment.ts` file, respectively in `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`.

Now you can build and run the app using `docker compose up --build -d`.

Open your browser and visit `http://127.0.0.1`.

## Development

Duplicate the `src/environments/environment.example.ts` file and rename it to `src/environments/environment.development.ts`.

Go to your Spotify App in your Spotify Dashboard and:

1. Add to the `Redirect URIs` list the `SPOTIFY_REDIRECT_URI` value as it is in the `environment.development.ts` file.
2. Copy the `Client ID` and `Client secret` and paste them in the `src/environments/environment.development.ts` file, respectively in `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`.

Now you can install dependencies using `pnpm i` and run the app using `pnpm start`.
