import React, { useContext, useEffect, useState } from 'react'
import { EmojiApi } from '../apis/EmojiApi'
import EmojiCard from './EmojiCard';
import { Mycontext } from '../utils/context';
import Loader from './Loader';

const Herosection = () => {
    const { Emoji, SetEmoji ,loading,Setloading} = useContext(Mycontext);
    const [PerPage, setPerPage] = useState(Number(32));
    const get = async () => {
        try {
            const res = await EmojiApi(`emojis?`);
            if (res && Array.isArray(res)) {
                SetEmoji(res);
                Setloading(false)
            } else {
                console.error('EmojiApi response is not an array:', res);
            }
        } catch (error) {
            console.error('Error fetching emojis', error);
        }
    };

    useEffect(() => {
        get();
    }, [])
    return (
        <div className='herosection'>
            <div className="emoji_bar">
                {loading ? <Loader /> : (<>
                    {Array.isArray(Emoji) && Emoji.length === 0 ? (
                        <p>No Results Found</p>
                    ) : (
                        Array.isArray(Emoji) &&
                        Emoji.slice(0, PerPage).map((emoji, i) => {
                            return <EmojiCard emoji={emoji} key={i} />;
                        })
                    )}
                     </>  )}
            </div>
           {loading ? "" :  <div className="btn">
                <button className='LoadMore' onClick={() => setPerPage(PerPage + 8)}>Load More</button>
                <button   className='LoadMore'  onClick={() => setPerPage((prevPerPage) => ( prevPerPage > 32 ? prevPerPage - 8 : prevPerPage))}>  Show Less</button>
            </div>}
        </div>
    )
}

export default Herosection
