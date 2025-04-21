import React from "react";

const LinkifyText = ({ text }) => {
    const parts = text.split(/(https?:\/\/[^\s]+)/g); // split text into normal and links

    return (
        <p>
            {parts.map((part, index) =>
                part.match(/https?:\/\/[^\s]+/) ? (
                    <a
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "blue", textDecoration: "underline" }}
                    >
                        {part}
                    </a>
                ) : (
                    <span key={index}>{part}</span>
                )
            )}
        </p>
    );
};

export default LinkifyText;