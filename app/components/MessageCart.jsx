import React from 'react';
import moment from 'moment';
import Avatar from './Avatar';

function MessageCard({ message, me, other }) {
    const isMessageFromMe = message.sender === me.id;

    const formatTimeAgo = (timestamp) => {
        const date = timestamp?.toDate();
        const momentDate = moment(date);
        return momentDate.fromNow();
    };
    return (
        <div key={message.id} className={`flex mb-4 ${isMessageFromMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex ${isMessageFromMe && 'flex-row-reverse'}`}>
            <div className={`${isMessageFromMe ? 'ml-2 mr-2' : 'mr-2'}`}>
                {isMessageFromMe && (
                    <Avatar user={me} />
                )}
                {!isMessageFromMe && (
                    <Avatar user={other} />
                )}
            </div>
            <div className={` text-white p-2 rounded-md ${isMessageFromMe ? 'bg-[#8ecae6] self-end' : 'bg-[#8ecae6] self-start'}`}>
                {
                    message.image && <img src={message.image} className='max-h-60 w-60 mb-4' />
                }
                <p className='text-lg font-semibold text-black'>{message.content}</p>
                <div className='text-xs text-[#0000009b]'>{formatTimeAgo(message.time)}</div>
            </div>
            </div>
        </div>
    );
}

export default MessageCard;