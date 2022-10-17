import React from "react"
import Receiver from "./Receiver"
import Sender from "./Sender"

type Convo = {
    name: string,
    message: string,
    timestamp: string
}

type Conversation = {
    conversations: Convo[]
}

const Conversation = (props: Conversation) => {
    return (
        <React.Fragment>
            {
                props.conversations.map((convo, index) => (
                    <div key={index}>
                        {convo.name === 'Danyel' ?
                            <Sender author={convo.name} content={convo.message} date={convo.timestamp} />
                            : <Receiver author={convo.name} content={convo.message} date={convo.timestamp} />
                        }
                    </div>
                ))
            }
        </React.Fragment>
    )
}