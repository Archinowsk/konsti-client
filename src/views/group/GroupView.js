// @flow
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector, useStore } from 'react-redux';
import {
  submitJoinGroup,
  submitCreateGroup,
  submitLeaveGroup,
} from 'views/group/groupActions';
import { GroupMembersList } from 'views/group/components/GroupMembersList';
import { sleep } from 'utils/sleep';
import { config } from 'config';
import { submitSignup } from 'views/signup/signupActions';
import { loadGroupMembers } from 'utils/loadData';
import type { GroupMember } from 'flow/group.flow';
import type { StatelessFunctionalComponent, Element } from 'react';

type Props = {};

export const GroupView: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const username: string = useSelector(state => state.login.username);
  const serial: string = useSelector(state => state.login.serial);
  const groupCode: string = useSelector(state => state.login.groupCode);
  const groupMembers: $ReadOnlyArray<GroupMember> = useSelector(
    state => state.login.groupMembers
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [loading, setLoading] = React.useState(false);
  (loading: boolean);

  const [showCreateGroup, setShowCreateGroup] = React.useState(false);
  (showCreateGroup: boolean);

  const [showJoinGroup, setShowJoinGroup] = React.useState(false);
  (showJoinGroup: boolean);

  const [joinGroupValue, setJoinGroupValue] = React.useState('');
  (joinGroupValue: string);

  const [message, setMessage] = React.useState('');
  (message: string);

  const [messageStyle, setMessageStyle] = React.useState('');
  (messageStyle: string);

  const [closeGroupConfirmation, setCloseGroupConfirmation] = React.useState(
    false
  );
  (closeGroupConfirmation: boolean);

  const store = useStore();

  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await loadGroupMembers(store);
    };
    fetchData();
  }, [store]);

  const openGroupForming = () => {
    setShowCreateGroup(true);
    setShowJoinGroup(false);
  };

  const openJoinGroup = () => {
    setShowJoinGroup(true);
    setShowCreateGroup(false);
  };

  const createGroup = async (): Promise<void> => {
    const groupData = {
      username: username,
      groupCode: serial,
      leader: true,
      ownSerial: serial,
    };
    const response = await dispatch(submitCreateGroup(groupData));
    if (response.status === 'success') {
      showMessage({ message: t('groupCreated'), style: response.status });
    } else if (response.status === 'error') {
      showMessage({
        message: t('generalCreateGroupError'),
        style: response.status,
      });
    }
  };

  // Remove all signups
  const removeSignups = async (): Promise<void> => {
    const signupData = {
      username,
      selectedGames: [],
      signupTime: 'all',
    };

    await dispatch(submitSignup(signupData));
  };

  const joinGroup = async (): Promise<void> => {
    const groupData = {
      username: username,
      groupCode: joinGroupValue,
      leader: false,
      ownSerial: serial,
    };

    const response = await dispatch(submitJoinGroup(groupData));

    if (response.status === 'success') {
      showMessage({ message: t('groupJoined'), style: response.status });
      await removeSignups();
    } else if (response.status === 'error') {
      if (response.code === 31) {
        showMessage({
          message: t('invalidGroupCode'),
          style: response.status,
        });
      } else if (response.code === 32) {
        showMessage({
          message: t('groupNotExist'),
          style: response.status,
        });
      } else {
        showMessage({
          message: t('generalCreateGroupError'),
          style: response.status,
        });
      }
    }
  };

  const leaveGroup = async ({ leader }): Promise<void> => {
    setLoading(true);

    const groupData = {
      username: username,
      groupCode: groupCode,
      leader,
      ownSerial: serial,
      leaveGroup: true,
    };
    const response = await dispatch(submitLeaveGroup(groupData));

    if (response.status === 'success') {
      showMessage({ message: t('leftGroup'), style: response.status });
    } else if (response.status === 'error') {
      if (response.code === 36) {
        showMessage({
          message: t('groupNotEmpty'),
          style: response.status,
        });
      } else {
        showMessage({
          message: t('generalLeaveGroupError'),
          style: response.status,
        });
      }
    }

    setShowJoinGroup(false);
    setLoading(false);
  };

  const toggleCloseGroupConfirmation = (value: boolean): void => {
    setCloseGroupConfirmation(value);
  };

  const closeGroup = async ({ leader }) => {
    setLoading(true);
    const groupData = {
      username: username,
      groupCode: groupCode,
      leader,
      ownSerial: serial,
      leaveGroup: true,
      closeGroup: true,
    };
    const response = await dispatch(submitLeaveGroup(groupData));

    if (response.status === 'success') {
      showMessage({ message: t('closedGroup'), style: response.status });
    } else if (response.status === 'error') {
      showMessage({
        message: t('generalLeaveGroupError'),
        style: response.status,
      });
    }

    toggleCloseGroupConfirmation(false);
    setLoading(false);
  };

  const handleJoinGroupChange = event => {
    setJoinGroupValue(event.target.value);
  };

  const isInGroup = () => {
    if (groupCode && groupCode !== '0') {
      return true;
    }
    return false;
  };

  const showMessage = async ({ message, style }): Promise<void> => {
    setMessage(message);
    setMessageStyle(style);
    await sleep(config.MESSAGE_DELAY);
    setMessage('');
    setMessageStyle('');
  };

  const groupLeader = isGroupLeader(groupCode, serial);
  const inGroup = isInGroup();

  const joinGroupInput = (
    <div>
      <input
        key='joinGroup'
        className='form-input'
        placeholder={t('enterGroupLeaderCode')}
        value={joinGroupValue}
        onChange={handleJoinGroupChange}
      />
    </div>
  );

  return (
    <div className='group-view'>
      <h2>{t('pages.group')}</h2>

      <div className='group-instructions'>
        <p>{t('groupSignupGuide')}</p>
      </div>

      {groupCode === '0' && !inGroup && (
        <Fragment>
          <button
            disabled={loading}
            className={showCreateGroup ? 'active' : ''}
            onClick={() => openGroupForming()}
          >
            {t('button.createGroup')}
          </button>

          <button
            disabled={loading}
            className={showJoinGroup ? 'active' : ''}
            onClick={() => openJoinGroup()}
          >
            {t('button.joinGroup')}
          </button>

          <span className={`group-status-message ${messageStyle}`}>
            {message}
          </span>

          {showCreateGroup && (
            <div>
              <p>{t('createGroupConfirmationMessage')}</p>
              <p>{t('groupLeaderWarning')}</p>
              <button disabled={loading} onClick={() => createGroup()}>
                {t('button.joinGroupConfirmation')}
              </button>
            </div>
          )}

          {showJoinGroup && (
            <div>
              <p className='bold'>{t('joiningGroupWillCancelGames')}</p>

              {joinGroupInput}
              <button disabled={loading} onClick={() => joinGroup()}>
                {t('button.joinGroup')}
              </button>
            </div>
          )}
        </Fragment>
      )}

      {groupLeader && inGroup && (
        <div className='group-info'>
          <p className='group-leader-info'>
            <span className='bold'>{t('youAreGroupLeader')}</span>.{' '}
            {t('groupLeaderInfo')}
          </p>
        </div>
      )}

      {!groupLeader && inGroup && (
        <div className='group-info'>
          <p>
            <span className='bold'>{t('youAreInGroup')}</span>.{' '}
            {t('groupMemberInfo')}
          </p>
        </div>
      )}

      {inGroup && (
        <Fragment>
          <div className='group-controls'>
            {!groupLeader && (
              <button
                disabled={loading}
                onClick={() => leaveGroup({ leader: groupLeader })}
              >
                {t('button.leaveGroup')}
              </button>
            )}

            {groupLeader && (
              <Fragment>
                <div>
                  <button
                    disabled={loading}
                    onClick={() => toggleCloseGroupConfirmation(true)}
                  >
                    {t('button.closeGroup')}
                  </button>

                  <span className={`group-status-message ${messageStyle}`}>
                    {message}
                  </span>
                </div>
                {closeGroupConfirmation && (
                  <div>
                    <p>{t('closeGroupConfirmation')}</p>
                    <button
                      disabled={loading}
                      onClick={() => toggleCloseGroupConfirmation(false)}
                    >
                      {t('button.cancel')}
                    </button>

                    <button
                      disabled={loading}
                      className={'warning-button'}
                      onClick={() => closeGroup({ leader: groupLeader })}
                    >
                      {t('button.closeGroup')}
                    </button>
                  </div>
                )}
              </Fragment>
            )}
          </div>

          <h3>{t('groupMembers')}</h3>
          <GroupMembersList groupMembers={groupMembers} />
        </Fragment>
      )}
    </div>
  );
};

export const isGroupLeader = (groupCode: string, serial: string): boolean => {
  if (groupCode === serial) {
    return true;
  }
  if (groupCode === '0') {
    return true;
  }
  return false;
};
