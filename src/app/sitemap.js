export default async function sitemap() {
  const baseUrl = "https://typearcade.vercel.app"; // change to your custom domain if you have one

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/Login`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/Profile`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/Arcade`,
      lastModified: new Date(),
    },
     {
      url: `${baseUrl}/SignUp`,
      lastModified: new Date(),
    },
     {
      url: `${baseUrl}/Typing`,
      lastModified: new Date(),
    },
  ];
}
