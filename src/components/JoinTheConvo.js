import React from "react";
import Link from "@docusaurus/Link";
import Twitter from "../../static/img/Twitter.svg";
import Discord from "../../static/img/Discord.svg";
import Telegram from "../../static/img/Telegram.svg";

import styles from "./JoinTheConvo.module.css";

export default function JoinTheConvo() {
  const discordURL = "https://discord.com/invite/EAujvncY2R";
  const twitterURL = "https://twitter.com/pendle_fi/";
  const teleURL = "https://t.me/pendlefinance/";

  return (
    <div className={styles.root}>
      <h2>Join the Conversation</h2>
      <div className={styles.linkContainer}>
        <Link className={styles.discordLink} href={discordURL}>
          <div className={styles.filter}>
            <Discord className={styles.logo} />
            Discord
          </div>
        </Link>
        <Link className={styles.twitterLink} href={twitterURL}>
          <div className={styles.filter}>
            <Twitter className={styles.logo} />
            Twitter
          </div>
        </Link>
        <Link className={styles.telegramLink} href={teleURL}>
          <div className={styles.filter}>
            <Telegram className={styles.logo} />
            Telegram
          </div>
        </Link>
      </div>
    </div>
  );
}
