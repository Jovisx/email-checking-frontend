import React, { useEffect, useState } from 'react';
import { useTranslation } from 'i18n';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Router } from 'i18n';

import { emailActions } from 'store/actions';
import { fromEmail } from 'store/selectors';
import { GridContainer, Row, Col } from 'components/grids';
import Button from 'components/widgets/Button';
import Modal from 'components/widgets/Modal';

import MainLayout from 'layouts/MainLayout';

const Gap = styled.div`
  width: 100%;
  height: 0;
  @media (max-width: 767px) {
    height: 56px;
    user-select: none;
  }
`;

const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
  width: 250px;
  height: 100px
`;

const EmailProcessPage = () => {
  const { t } = useTranslation('language');
  const [emailInfo, setEmailInfo] = useState({});
  const [isOpened, setIsOpened] = useState(false);

  const dispatch = useDispatch();
  const email = useSelector(fromEmail.email);
  const assignStatus = useSelector(fromEmail.assignStatus);
  const processStatus = useSelector(fromEmail.processStatus);
  let timeout;

  useEffect(() => {
    dispatch(emailActions.assignEmailRequest());
  }, []);

  useEffect(() => {
    if (assignStatus === 'success' && processStatus !== 'running') {
      console.log('assignStatus :>> ', assignStatus);
      setEmailInfo(email);

      clearTimeout(timeout);
      timeout = setTimeout(function() {
        setIsOpened(true);
        proccessEmail('Expired');
      }, 120000);
    }
  }, [assignStatus]);

  const proccessEmail = status => {
    dispatch(emailActions.processEmailRequest({ emailId: emailInfo.id, status: status }));
  };

  useEffect(() => {
    if (processStatus === 'success') {
      if (!isOpened) {
        dispatch(emailActions.assignEmailRequest());
      }
    }
  }, [processStatus]);

  if (processStatus === 'running') {
    return <Loading>Processing email...</Loading>
  }

  if (assignStatus === 'running') {
    return <Loading>Loading email...</Loading>
  }

  return (
    <MainLayout title={t('email.title')}>
      <Gap />
      <GridContainer gutter={20}>
        <Row>
          <Col sm={4}>
              <Button type="primary" onClick={() => proccessEmail('Positive reply')}>Positive reply</Button>
          </Col>
          <Col sm={4}>
              <Button type="primary" onClick={() => proccessEmail('Neutral reply')}>Neutral reply</Button>
          </Col>
          <Col sm={4}>
              <Button type="primary" onClick={() => proccessEmail('Not a lead')}>Not a lead</Button>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col xl={12}>
            Subject: {emailInfo.subject}
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col xl={12}>
            Date: {emailInfo.createdAt}
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col xl={12}>
            Email Lead: {emailInfo.emailLead}
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col xl={12}>
            Resolved by: {emailInfo.resolvedBy}
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col xl={12}>
            Email Body: {emailInfo.emailBody}
          </Col>
        </Row>
        <br></br>
        
      </GridContainer>
      <Modal
        isOpened={isOpened}
        size="small"
        title="Time has been expired."
        onConfirm={() => setIsOpened(false)}
      >
      </Modal>
    </MainLayout>
  );
};

export default EmailProcessPage;
