async function LoadGallery() {
    //Show spinner:
    let loader = document.createElement('div')

    loader.classList.add("loader")

    document.getElementById("gallery-body").appendChild(loader)

    const cloudName = 'dxjlwi2br';
    const tagName = "Mom's Mothers Day";
    const url = `https://res.cloudinary.com/${cloudName}/image/list/${tagName}.json`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const gallery = document.getElementById('galleryImgs');
        data.resources.forEach(img => {
            // 1. Create the anchor tag
            const link = document.createElement('a');
            const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${img.public_id}.${img.format}`

            link.href = imageUrl; // Links directly to the image file
            link.target = "_blank"; // Opens in a new tab/page

            // 2. Create the image tag
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = "Gallery Image";

            // 3. Nest them: gallery > a > img
            link.appendChild(imgElement);
            gallery.appendChild(link);
        });

        document.getElementById("LoadImagesBtn").remove();
        document.getElementById("Gallery-CTA").innerHTML = "Check out some of your photos!"
    } catch (error) {
        console.error('Error fetching images:', error);
    } finally {
        loader.remove();
    }
}
