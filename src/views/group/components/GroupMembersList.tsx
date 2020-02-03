import React, { FunctionComponent, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { GroupMember } from 'typings/group.typings';

export interface Props {
  groupMembers: readonly GroupMember[];
}

export const GroupMembersList: FunctionComponent<Props> = (
  props: Props
): ReactElement<'div'> => {
  const { groupMembers } = props;
  const { t } = useTranslation();

  if (!groupMembers) return <div className='group-members-list' />;

  const membersList = groupMembers.map((member, index) => {
    const leader = member.serial === member.groupCode;
    return (
      <p key={member.username}>
        {index + 1}) {member.username}{' '}
        {leader && <span>({t('groupLeader')})</span>}
      </p>
    );
  });

  return <div className='group-members-list'>{membersList}</div>;
};
