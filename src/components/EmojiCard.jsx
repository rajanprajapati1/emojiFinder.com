import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EmojiCard = ({ emoji }) => {
    const [copied, setCopied] = useState(false);
    const result = emoji?.slug.split('-')?.map(val => val) || [];
    const lastTwoObjects = result
        .slice(-2)
        .filter(val => isNaN(Number(val)))
        .join(' ');

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(emoji?.character);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 500);
        } catch (error) {
            console.log('Unable to copy', error);
        }
    }

return (<>
        {emoji ? (
            <div className='emojicard' onClick={handleCopy}>
                {copied ? (
                    <div className='overlay'>
                        <h2>Copied</h2>
                    </div>
                ) : null}
                <Link to={`/emoji/${emoji?.slug}`}>
                    <h1>{emoji?.character}</h1>
                </Link>
                <small>{lastTwoObjects}</small>
            </div>
        ) : (
            <div className="skeleton">
            </div>
        )}
    </>
    );
};

export default EmojiCard;
