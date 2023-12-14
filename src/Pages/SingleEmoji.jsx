import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { EmojiApi } from '../apis/EmojiApi';
import EmojiCard from '../components/EmojiCard';
import { Mycontext } from '../utils/context';
import Loader from '../components/Loader';

const SingleEmoji = () => {
    const { loading, Setloading } = useContext(Mycontext)
    const [EmojiData, setEmojiData] = useState();
    const [SameGroupEmoji, setSameGroupEmoji] = useState([]);
    const { id } = useParams();
    const getsingle = async () => {
        try {
            const res = await EmojiApi(`emojis/${id}?`);
            Setloading(false)
            setEmojiData(res[0]);
            fetchSamGroup(res[0]?.group);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchSamGroup = async (query) => {
        try {
            const res = await EmojiApi(`categories/${query}?`);
            setSameGroupEmoji(res);
        } catch (error) {

        }
    }
    useEffect(() => {
        Setloading(true)
        getsingle();
    }, [id])
    const result = EmojiData?.slug ? EmojiData.slug.split('-').map((val) => val) : [];
    const lastTwoObjects = result
        ?.slice(-2)
        ?.filter(val => isNaN(Number(val)))
        ?.join(' ');
    return (
        <>
            <Navbar />
            {loading ? <Loader/> : (<>
            <div className='Singleemoji'>
                <div className="flex_container">
                    <div className="first_con">
                        <h1>{EmojiData?.character} </h1>
                    </div>
                    <div className="second_con">
                        <h1>{lastTwoObjects || EmojiData?.codePoint}</h1>
                        <div className="details">
                            <h2>Character : {EmojiData?.character}</h2>
                            <h2>CodePoint : {EmojiData?.codePoint}</h2>
                            <h2>Group : {EmojiData?.group}</h2>
                            <h2>SubGroup : {EmojiData?.subGroup}</h2>
                            <h2>UnicodeName : {EmojiData?.unicodeName}</h2>
                        </div>
                    </div>
                </div>
                <div className="also_category">
                    <h1>Similiar Group : </h1>
                    <div className="emoji_slide">
                        {SameGroupEmoji?.map((emoji, i) => {
                            return <EmojiCard emoji={emoji} key={i} />
                        })}
                    </div>
                </div>
            </div>

            </>)}
                    </>
    );

}

export default SingleEmoji
