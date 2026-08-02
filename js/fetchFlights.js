//fetch data from api 
export async function fetchData(url) {  

    // fetch data
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch flights");
    }

    return await response.json();
    
}