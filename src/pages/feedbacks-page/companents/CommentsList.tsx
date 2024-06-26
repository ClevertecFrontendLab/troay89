import { StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { history } from '@redux/reducers/routerSlice.ts';
import { Avatar, Button, Card, List } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { saveComments } from '@redux/reducers/commentsSlice.ts';
import { useGetFeedbacksQuery } from '@redux/reducers/apiSlice.ts';
import { Comments } from '../../../type/Data.ts';
import { CommentModal } from '@components/modal/comment-modal/CommentModal.tsx';
import { Loader } from '@components/loader/Loader.tsx';
import { ErrorModal } from '@components/modal/error-modal/ErrorModal.tsx';
import { JVT_TOKEN, paths, statusCodes } from '@constants/constants.ts';
import './CommentsList.css';
import { PrimaryButton } from '@components/buttons/PrimaryButton.tsx';

type CommentsListProps = {
    isCloseSide: boolean;
};

export const CommentsList: React.FC<CommentsListProps> = ({ isCloseSide }) => {
    const commentsList = useAppSelector((state) => state.saveComments.comments);
    const dispatch = useAppDispatch();
    const [showAll, setShowAll] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);
    const { data, isLoading, error } = useGetFeedbacksQuery();

    useEffect(() => {
        if (data) {
            dispatch(saveComments(data));
        } else if (error) {
            if ('status' in error && error.status === statusCodes.ERROR_403) {
                localStorage.removeItem(JVT_TOKEN);
                sessionStorage.removeItem(JVT_TOKEN);
                history.push(paths.auth.path);
            } else {
                setIsModalErrorOpen(true);
            }
        }
    }, [commentsList, data, dispatch, error]);

    const handleShowComment = () => {
        setIsModalOpen(true);
    };

    if (isLoading) {
        return <Loader />;
    }

    if (!commentsList.length) {
        return (
            <>
                <CommentModal isModal={isModalOpen} closeModal={() => setIsModalOpen(false)} />
                <ErrorModal
                    isModal={isModalErrorOpen}
                    closeModal={() => setIsModalErrorOpen(false)}
                />
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
                    <PrimaryButton
                        className={'first-comment-primary style-second'}
                        htmlType={'button'}
                        onClick={handleShowComment}
                        dataTestId={'write-review'}
                        text={'Написать отзыв'}
                    />
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
                            title={item.fullName ?? 'Пользователь'}
                        />
                        <span className={'wrapper-comment'}>
                            <span className={'wrapper-comment-data'}>
                                <span className={'rating-comment'}>
                                    {Array(5)
                                        .fill(null)
                                        .map((_, i) =>
                                            i < item.rating ? (
                                                <StarFilled key={i} />
                                            ) : (
                                                <StarOutlined key={i} className={'empty'} />
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
            <div className={'wrapper-comment-button'}>
                <PrimaryButton
                    className={'comment-primary style-second'}
                    htmlType={'button'}
                    onClick={handleShowComment}
                    dataTestId={'write-review'}
                    text={'Написать отзыв'}
                />
                <Button
                    className={'comment-link'}
                    type='link'
                    size={'large'}
                    onClick={() => setShowAll(!showAll)}
                    data-test-id='all-reviews-button'
                >
                    {showAll ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
                </Button>
            </div>
        </>
    );
};
