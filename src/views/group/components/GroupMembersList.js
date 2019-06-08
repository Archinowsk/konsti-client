/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import type { GroupMember } from 'flow/group.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  groupMembers: $ReadOnlyArray<GroupMember>,
}

const GroupMembersList: StatelessFunctionalComponent<Props> = (
  props: Props
) => {
  const { groupMembers } = props
  const { t } = useTranslation()

  if (!groupMembers) return <div className='group-members-list' />

  const membersList = groupMembers.map(member => {
    const leader = member.serial === member.playerGroup
    return (
      <React.Fragment key={member.username}>
        <li>
          {member.username} {leader && <span>({t('groupLeader')})</span>}
        </li>
      </React.Fragment>
    )
  })

  return <div className='group-members-list'>{membersList}</div>
}

export default GroupMembersList
