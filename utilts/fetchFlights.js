//fetch data from api 
export async function fetchData(url) {  

    // fetch data
    const response = await fetch(url);

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error);
    }

    return await response.json();
    
}