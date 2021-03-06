import React from "react"
import { formatDate } from "../utils/general.utils"
import { displayAmount } from "../utils/token.utils"
import AddressShortcut from "./AddressShortcut"
import RecoverStakeButton from "./RecoverStakeButton"
import StatusBadge, { BADGE_STATUS } from "./StatusBadge"
import { PENDING_STATUS, COMPLETE_STATUS } from "../constants/constants"
import { DataTable, Column } from "./DataTable"
import Tile from "./Tile"

const Undelegations = ({ undelegations }) => {
  return (
    <Tile
      title="Undelegations"
      withTooltip={true}
      tooltipProps={{
        text: (
          <>
            <span className="text-bold">Recover</span>
            &nbsp;undelegated tokens to return them to your token balance.
          </>
        ),
      }}
    >
      <DataTable data={undelegations} itemFieldId="operatorAddress">
        <Column
          header="amount"
          field="amount"
          renderContent={({ amount }) => `${displayAmount(amount)} KEEP`}
        />
        <Column
          header="status"
          field="undelegationStatus"
          renderContent={(undelegation) => {
            const undelegationStatus = undelegation.canRecoverStake
              ? COMPLETE_STATUS
              : PENDING_STATUS
            const statusBadgeText =
              undelegationStatus === PENDING_STATUS
                ? `${undelegationStatus.toLowerCase()}, ${undelegation.undelegationCompleteAt.fromNow(
                    true
                  )}`
                : formatDate(undelegation.undelegationCompleteAt)

            return (
              <StatusBadge
                status={BADGE_STATUS[undelegationStatus]}
                className="self-start"
                text={statusBadgeText}
                onlyIcon={undelegationStatus === COMPLETE_STATUS}
              />
            )
          }}
        />
        <Column
          header="beneficiary"
          field="beneficiary"
          renderContent={({ beneficiary }) => (
            <AddressShortcut address={beneficiary} />
          )}
        />
        <Column
          header="operator"
          field="operatorAddress"
          renderContent={({ operatorAddress }) => (
            <AddressShortcut address={operatorAddress} />
          )}
        />
        <Column
          header="authorizer"
          field="authorizerAddress"
          renderContent={({ authorizerAddress }) => (
            <AddressShortcut address={authorizerAddress} />
          )}
        />
        <Column
          header=""
          field=""
          renderContent={(undelegation) =>
            undelegation.canRecoverStake && (
              <RecoverStakeButton
                isFromGrant={undelegation.isFromGrant}
                isManagedGrant={undelegation.isManagedGrant}
                managedGrantContractInstance={
                  undelegation.managedGrantContractInstance
                }
                operatorAddress={undelegation.operatorAddress}
              />
            )
          }
        />
      </DataTable>
    </Tile>
  )
}

export default Undelegations
