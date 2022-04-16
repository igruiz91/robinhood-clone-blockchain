import { useContext } from "react";
import { RobinHoodContext } from "../context/RobinhoodContext";

const BuyTokens = () => {
  const {
    isAuthenticated,
    setAmount,
    mint,
    setCoinSelect,
    coinSelect,
    toCoin,
    setToCoin,
    amount,
  } = useContext(RobinHoodContext);

  return (
    <form className={styles.formContainer}>
      <div
        className={styles.coin}
        value={coinSelect}
        onChange={(e) => setCoinSelect(e.target.value)}
      >
        <select className={styles.select}>
          <option className={styles.options} value="BTC">
            BTC
          </option>
          <option className={styles.options} value="ETH">
            ETH
          </option>
          <option className={styles.options} value="SOL">
            SOL
          </option>
          <option className={styles.options} value="USDT">
            USDT
          </option>
        </select>

        <select className={styles.select} value={toCoin} onChange={e => setToCoin(e.target.value)}>
          <option className={styles.options} value="BTC">
            BTC
          </option>
          <option className={styles.options} value="ETH">
            ETH
          </option>
          <option className={styles.options} value="SOL">
            SOL
          </option>
          <option className={styles.options} value="USDT">
            USDT
          </option>
        </select>
        <input
          className={styles.inputAmount}
          type="text"
          placeholder="Amount..."
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <button className={styles.noticeCTA} type="button" disabled={!isAuthenticated} onClick={() => mint()}>
          Send
        </button>
      </div>
    </form>
  );
};

const styles = {
  inputAmount: `w-1/2 flex items-center justify-center border border-white rounded-lg p-2 bg-transparent mt-6 text-white placeholder:text-white`,
  formContainer: `flex items-center`,
  select: `w-1/2 flex items-center justify-center border border-white rounded-lg p-2 bg-transparent mt-6 text-white placeholder:text-white`,
  options: `w-1/2 flex items-center justify-center border border-white rounded-lg p-2 bg-black mt-6 text-white placeholder:text-white`,
  noticeCTA: "font-bold text-green-500 cursor-pointer mt-5",
  coin: "flex h-full w-full flex-col items-center",
};

export default BuyTokens;
