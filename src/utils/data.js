
export const BaseUrl = "https://yt-sale-api.vercel.app";

export const timeAgo = (date1) => {
    const date = new Date(date1);
    const currentTime = new Date();
    const timeDiff = currentTime.getTime() - date.getTime();

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);

    if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months > 0) {
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (weeks > 0) {
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
}


export const fetchUser = async (id) => {
    try {
        const response = await fetch(`${BaseUrl}/register/${id}`);
        const json = await response.json();
        return json;
    } catch (e) {
        console.log('error fetching user...', e);
    }
}

export const fetchListing = async (id) => {
    try {
        const response = await fetch(`${BaseUrl}/singleListing/${id}`);
        const json = await response.json();
        return json;
    } catch (e) {
        console.log('error fetching user...', e);
    }
}

export const updateOnline = async (status) => {
    try {
        const id = localStorage.getItem('id');
        const response = await fetch(`${BaseUrl}/register/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                online: status
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        console.log('Update successful:', data);

    } catch (e) {
        console.log('error updating online status...', e);
    }
}