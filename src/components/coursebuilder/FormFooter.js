import React from "react"

export const QuizFormFooter = ({ enableBack, onBack, onSubmit, submitText, onCancle }) => {
    return (
        <div className='widthManager quizFooterBTNs'>
            <button className='qCancleBtn' onClick={onCancle}>Cancle</button>
            <div className='qFormAdjBTNS'>
                {enableBack === true && <button className='qCancleBtn' onClick={onBack}>Back</button>}
                <button className='qSubmitBtn' onClick={onSubmit}>{submitText}</button>
            </div>
        </div>
    )
}
