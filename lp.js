function scrollCategoryList(direction) {
    const categoryList = document.getElementById('categoryList');
    const scrollAmount = 120; // Adjust as needed

    if (categoryList) {
        if (direction === 'left') {
            categoryList.scrollLeft -= scrollAmount;
        } else if (direction === 'right') {
            categoryList.scrollLeft += scrollAmount;
        }
    } else {
        console.error("Element with ID 'categoryList' not found.");
    }
}

function scrollMangaList(direction) {
    const mangaList = document.getElementById('mangaList');
    const scrollAmount = 120; // Adjust as needed

    if (mangaList) {
        if (direction === 'left') {
            mangaList.scrollLeft -= scrollAmount;
        } else if (direction === 'right') {
            mangaList.scrollLeft += scrollAmount;
        }
    } else {
        console.error("Element with ID 'mangaList' not found.");
    }
}

function previewImage(event) {
    var uploadedImage = document.querySelector('.user img');
    uploadedImage.src = URL.createObjectURL(event.target.files[0]);
}

// Function to fetch anime data from AniList API
async function fetchAnimeData() {
    try {
        const response = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query {
                        Page(page: 1, perPage: 20) {
                            media(type: ANIME) {
                                id
                                title {
                                    romaji
                                }
                                coverImage {
                                    large
                                    medium
                                }
                            }
                        }
                    }
                `
            })
        });

        const responseData = await response.json();
        return responseData.data.Page.media;
    } catch (error) {
        console.error('Error fetching anime data:', error);
        return [];
    }
}

// Function to display anime covers and titles in HTML
async function displayAnimeCovers() {
    try {
        const animeData = await fetchAnimeData();
        animeData.forEach((anime, index) => {
            const artDiv = document.getElementById(`art-${index + 1}`);
            if (artDiv) {
                const img = document.createElement('img');
                // Use a higher resolution image if available
                img.src = anime.coverImage.large || anime.coverImage.medium;
                img.alt = anime.title.romaji;

                const title = document.createElement('div');
                title.classList.add('title-overlay'); // Add the class for the anime covers' overlay
                title.textContent = anime.title.romaji;

                // Ensure title is centered and on top of the image
                title.style.position = 'absolute';
                title.style.top = '50%';
                title.style.left = '50%';
                title.style.transform = 'translate(-50%, -50%)';
                title.style.zIndex = '1';
                title.style.textAlign = 'center';
                title.style.pointerEvents = 'none'; // Make sure overlay doesn't interfere with hover events

                artDiv.innerHTML = '';
                artDiv.appendChild(img);
                artDiv.appendChild(title);

                // Show overlay on hover
                artDiv.addEventListener('mouseenter', () => {
                    title.style.opacity = '1';
                });

                // Hide overlay when not hovered
                artDiv.addEventListener('mouseleave', () => {
                    title.style.opacity = '0';
                });
            }
        });
    } catch (error) {
        console.error('Error displaying anime covers:', error);
    }
}

displayAnimeCovers();


// Function to fetch manga data from AniList API
async function fetchMangaData() {
    try {
        const response = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query {
                        Page(page: 1, perPage: 20) {
                            media(type: MANGA) {
                                id
                                title {
                                    romaji
                                }
                                coverImage {
                                    large
                                    medium
                                }
                            }
                        }
                    }
                `
            })
        });

        const responseData = await response.json();
        return responseData.data.Page.media;
    } catch (error) {
        console.error('Error fetching manga data:', error);
        return [];
    }
}

// Function to display manga covers and titles in HTML
async function displayMangaCovers() {
    try {
        const mangaData = await fetchMangaData();
        mangaData.forEach((manga, index) => {
            const mangaDiv = document.getElementById(`ant-${index + 1}`);
            if (mangaDiv) {
                const img = document.createElement('img');
                // Use a higher resolution image if available
                img.src = manga.coverImage.large || manga.coverImage.medium;
                img.alt = manga.title.romaji;

                const title = document.createElement('div');
                title.classList.add('title-overlay'); // Add the class for the manga covers' overlay
                title.textContent = manga.title.romaji;

                // Ensure title is centered and on top of the image
                title.style.position = 'absolute';
                title.style.top = '50%';
                title.style.left = '50%';
                title.style.transform = 'translate(-50%, -50%)';
                title.style.zIndex = '1';
                title.style.textAlign = 'center';
                title.style.pointerEvents = 'none'; // Make sure overlay doesn't interfere with hover events

                mangaDiv.innerHTML = '';
                mangaDiv.appendChild(img);
                mangaDiv.appendChild(title);

                // Show overlay on hover
                mangaDiv.addEventListener('mouseenter', () => {
                    title.style.opacity = '1';
                });

                // Hide overlay when not hovered
                mangaDiv.addEventListener('mouseleave', () => {
                    title.style.opacity = '0';
                });
            }
        });
    } catch (error) {
        console.error('Error displaying manga covers:', error);
    }
}

displayMangaCovers();
