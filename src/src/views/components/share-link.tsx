import React from 'react';

const ShareLink = ({ display, familyCode, href }: any) => {
    const fullHref = `${href}${encodeURIComponent(`Rejoins le groupe famille ! Utilise le code de famille : ${familyCode}`)}`;

    return (
        <a
            href={fullHref}
            target="_blank"
            rel="noopener noreferrer"
            class="bg-green text-white py-2 px-4 rounded-full hover:bg-green-dark"
        >
            {display}
        </a>
    );
};

export default ShareLink;
