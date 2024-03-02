import React from 'react';
import { LayoutComponent } from '@components/layout';
import { CommentsList } from '@pages/feedbacks-page/companents/CommentsList.tsx';

export const FeedbacksPage: React.FC = () => {
    return (
        <LayoutComponent>{(collapsed) => <CommentsList isCloseSide={collapsed} />}</LayoutComponent>
    );
};
