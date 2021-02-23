/**
 * Created by chalosalvador on 10/2/21
 */
export const fetcher = async (url) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`);
  const data = await response.json();

  console.log("data", data);

  return data;
};
