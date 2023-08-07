import React from "react";
import { formatDate } from '../../../helpers';
import './WallPostItem.scss';


const WallPostItem = ({ wallPost }) => {
    return (
        <div className="wallpost">
            <div className="wallpost__author">
                <div className="wallpost__title">
                    <img src={`/images/avatars/${wallPost.author.avatar}`} alt={wallPost.author.name}/>
                    <div className="wallpost__data">
                        <p>{wallPost.author.lastname}</p>
                        <p>{wallPost.author.name}</p>
                        <p>{wallPost.author.patronymic}</p>
                    </div>
                </div>
                <div className="wallpost__utils">
                    <div className="wallpost__position">{wallPost.author.position}</div>
                    <div className="wallpost__date">{formatDate(wallPost.date)}</div>
                </div>
            </div>
            <p>{wallPost.text}</p>
        </div>
    )
}

export default WallPostItem;