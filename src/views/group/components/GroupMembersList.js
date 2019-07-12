/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import type { GroupMember } from 'flow/group.flow'
import type { StatelessFunctionalComponent, Element } from 'react'

type Props = {|
  groupMembers: $ReadOnlyArray<GroupMember>,
|}

export const GroupMembersList: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const { groupMembers } = props
  const { t } = useTranslation()

  if (!groupMembers) return <div className='group-members-list' />

  const membersList = groupMembers.map(member => {
    const leader = member.serial === member.groupCode
    return (
      <li key={member.username}>
        {member.username} {leader && <span>({t('groupLeader')})</span>}
      </li>
    )
  })

  return <div className='group-members-list'>{membersList}</div>
}
