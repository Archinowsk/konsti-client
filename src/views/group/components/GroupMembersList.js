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

  const membersList = groupMembers.map((member, index) => {
    const leader = member.serial === member.groupCode
    return (
      <p key={member.username}>
        {index + 1}) {member.username}{' '}
        {leader && <span>({t('groupLeader')})</span>}
      </p>
    )
  })

  return <div className='group-members-list'>{membersList}</div>
}
