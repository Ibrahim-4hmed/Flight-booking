function renderSkeleton(count = 4){

    const cards = document.querySelector(".cards");

    cards.innerHTML = "";

    const template =
        document.getElementById("skeleton-template");

    for(let i = 0; i < count; i++){

        cards.append(
            template.content.cloneNode(true)
        );

    }

}