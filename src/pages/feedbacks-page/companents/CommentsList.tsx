import { StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, List } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { saveComments } from '@redux/reducers/commentsSlice.ts';
import { useGetFeedbacksQuery } from '@redux/reducers/apiSlice.ts';
import './CommentsList.css';
import { Comments } from '../../../type/Data.ts';
import { CommentModal } from '@components/modal/CommentModal.tsx';

type CommentsListProps = {
    isCloseSide: boolean;
};

export const CommentsList: React.FC<CommentsListProps> = ({ isCloseSide }) => {
    const commentsList = useAppSelector((state) => state.saveComments.comments);
    const { data, isLoading, error } = useGetFeedbacksQuery();
    const dispatch = useAppDispatch();
    const [showAll, setShowAll] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (data) {
            dispatch(saveComments(data));
        } else if (error) {
            console.log(error, 2222);
        }
    }, [commentsList, data, dispatch, error, isLoading]);

    const handleShowComment = () => {
        setIsModalOpen(true);
    };

    if (!commentsList.length) {
        return (
            <>
                <CommentModal isModal={isModalOpen} closeModal={() => setIsModalOpen(false)} />
                <div className={'wrapper-empty-list'}>
                    <Card className={`message ${isCloseSide ? 'sider-close' : ''}`}>
                        <h3 className={'title'}>Оставьте свой отзыв первым</h3>
                        <div className={'text'}>
                            Вы можете быть первым, кто оставит отзыв об этом фитнесс
                            приложении.&nbsp;
                            <br />
                            Поделитесь своим мнением и опытом с другими пользователями,&nbsp; <br />
                            и помогите им сделать правильный выбор.
                        </div>
                    </Card>
                    <Button
                        className={'first-comment-primary'}
                        type='primary'
                        size={'large'}
                        onClick={handleShowComment}
                    >
                        Написать отзыв
                    </Button>
                </div>
            </>
        );
    }

    const sortedCommentsList = [...commentsList].sort(
        (a: Comments, b: Comments) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    const commentsToShow = showAll ? sortedCommentsList : sortedCommentsList.slice(0, 4);

    return (
        <>
            <CommentModal isModal={isModalOpen} closeModal={() => setIsModalOpen(false)} />
            <List
                className={'comments-list-user'}
                itemLayout='vertical'
                size='large'
                dataSource={commentsToShow}
                renderItem={(item) => (
                    <List.Item className={'comment'} key={item.id}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.imageSrc ?? <UserOutlined />} />}
                            title={item.fullName ?? 'Анонимный пользователь'}
                        />
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
                                <span className={'date-create-comment'}>
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </span>
                            </span>
                            <span className={'text-comment'}>{item.message}</span>
                        </span>
                    </List.Item>
                )}
            />
            <div className={'wrapper-button'}>
                <Button
                    className={'comment-primary'}
                    type='primary'
                    size={'large'}
                    onClick={handleShowComment}
                >
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
