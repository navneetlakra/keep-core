import React, { useContext } from "react"
import DelegateStakeForm from "../components/DelegateStakeForm"
import TokensOverview from "../components/TokensOverview"
import { tokensPageService } from "../services/tokens-page.service"
import { Web3Context } from "../components/WithWeb3Context"
import { useShowMessage, messageType } from "../components/Message"
import { LoadingOverlay } from "../components/Loadable"
import { useTokensPageContext } from "../contexts/TokensPageContext"
import PageWrapper from "../components/PageWrapper"
import Tile from "../components/Tile"
import TokensContextSwitcher from "../components/TokensContextSwitcher"
import DelegationOverview from "../components/DelegationOverview"

const TokensPage = () => {
  const web3Context = useContext(Web3Context)
  const showMessage = useShowMessage()

  const {
    keepTokenBalance,
    minimumStake,
    isFetching,
    selectedGrant,
    tokensContext,
  } = useTokensPageContext()

  const handleSubmit = async (values, onTransactionHashCallback) => {
    values.context = tokensContext
    values.selectedGrant = { ...selectedGrant }
    try {
      await tokensPageService.delegateStake(
        web3Context,
        values,
        onTransactionHashCallback
      )
      showMessage({
        type: messageType.SUCCESS,
        title: "Success",
        content: "Staking delegate transaction has been successfully completed",
      })
    } catch (error) {
      showMessage({
        type: messageType.ERROR,
        title: "Staking delegate action has failed ",
        content: error.message,
      })
      throw error
    }
  }

  const getAvailableToStakeAmount = () => {
    if (tokensContext === "granted") {
      return selectedGrant.availableToStake
    }

    return keepTokenBalance
  }

  return (
    <LoadingOverlay isFetching={isFetching}>
      <PageWrapper title="Delegate Tokens From:">
        <TokensContextSwitcher />
        <div className="tokens-wrapper">
          <Tile
            title="Delegate Tokens"
            id="delegate-stake-section"
            withTooltip
            tooltipProps={{
              text: (
                <>
                  <span className="text-bold">Delegation</span>&nbsp; sets aside
                  an amount of KEEP to be staked by a trusted third party,
                  referred to within the dApp as an operator.
                </>
              ),
            }}
          >
            <DelegateStakeForm
              onSubmit={handleSubmit}
              minStake={minimumStake}
              availableToStake={getAvailableToStakeAmount()}
            />
          </Tile>
          <TokensOverview />
        </div>
        <DelegationOverview />
      </PageWrapper>
    </LoadingOverlay>
  )
}

export default React.memo(TokensPage)
