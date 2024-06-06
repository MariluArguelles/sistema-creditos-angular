

interface Environ {
  production: boolean;
  environment: string;
  api: string;
  clientId: string; // Suponiendo que clientId es una cadena de texto
  filenameCsv:string;
}

export const environment:Environ = {
  production: true,
  environment: "local",
  //api: "https://localhost:7287/api/",
  api: "https://malucienta2024-001-site1.anytempurl.com/api/",
  //api: "https://malucienta2024-001-site1.anytempurl.com/api/",
        
  clientId : "148439677328-6a9g4mskq0djq8rv71cr1nid6or8krua.apps.googleusercontent.com",
  filenameCsv: "dev-pos"
};



