import { StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, List } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { saveComments } from '@redux/reducers/commentsSlice.ts';
import { useGetFeedbacksQuery } from '@redux/reducers/apiSlice.ts';
import './CommentsList.css';
import { Comments } from '../../../type/Data.ts';

export const CommentsList: React.FC = () => {
    const commentsList = useAppSelector((state) => state.saveComments.comments);
    const { data, isLoading, error } = useGetFeedbacksQuery();
    const dispatch = useAppDispatch();
    const [showAll, setShowAll] = useState(false);

    let ddata;
    if (commentsList.length > 0) {
        console.log(commentsList);
        const sortedCommentsList = [...commentsList].sort(
            (a: Comments, b: Comments) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        const commentsToShow = showAll ? sortedCommentsList.length : 4;
        ddata = Array.from({ length: commentsToShow }).map((_, i) => ({
            id: sortedCommentsList[i].id,
            title: sortedCommentsList[i]?.fullName ?? 'Анонимный пользавотель',
            avatar: <UserOutlined />,
            content: sortedCommentsList[i].message ?? '',
            createdAt: new Date(sortedCommentsList[i].createdAt).toLocaleTimeString(),
            rating: sortedCommentsList[i].rating,
        }));
    }

    useEffect(() => {
        if (data) {
            dispatch(saveComments(data));
        } else if (error) {
            console.log(error, 2222);
        } else if (isLoading) {
            console.log(isLoading, 33333);
        }
    }, [commentsList, data, dispatch, error, isLoading]);
    return (
        <>
            <List
                className={'comments-list-user'}
                itemLayout='vertical'
                size='large'
                dataSource={ddata}
                renderItem={(item) => (
                    <List.Item className={'comment'} key={item.title}>
                        <List.Item.Meta avatar={<Avatar src={item.avatar} />} title={item.title} />
                        <span className={'wrapper-comment'}>
                            <span className={'wrapper-comment-data '}>
                                <span className={'rating-comment'}>
                                    {Array(5)
                                        .fill(null)
                                        .map((_, i) =>
                                            i < item.rating ? (
                                                <StarFilled key={i} />
                                            ) : (
                                                <StarOutlined key={i} />
                                            ),
                                        )}
                                </span>
                                <span className={'date-create-comment'}>{item.createdAt}</span>
                            </span>
                            <span className={'text-comment'}>{item.content}</span>
                        </span>
                    </List.Item>
                )}
            />
            <div className={'wrapper-button'}>
                <Button className={'comment-primary'} type='primary' size={'large'}>
                    Написать отзыв
                </Button>
                <Button
                    className={'comment-link'}
                    type='link'
                    size={'large'}
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
                </Button>
            </div>
        </>
    );
};
