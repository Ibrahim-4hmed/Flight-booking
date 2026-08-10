export function renderSkeleton(count = 4,cards,template){

    cards.innerHTML = "";

    for(let i = 0; i < count; i++){

        cards.append(
            template.content.cloneNode(true)
        );

    }

}