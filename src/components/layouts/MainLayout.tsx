import { useNavigate, useLocation, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { randomPoz1, randomPoz2, randomPoz3, randomPoz4, randomPoz5, randomPoz6, randomPoz7, randomPoz8, randomPoz9, randomPoz10, randomPoz11, randomPoz12 } from "../scripts/HeartsRandom";
import Header from "./header/Header";
import styles from "./MainLayout.module.scss";
import Footer from "./footer/Footer";
import heartPink from "./little-heart-pink.png";
import heartPinkRight from "./little-heart-pink-right.png";
import heartPurple from "./little-heart-purple.png";
import heartPurpleRight from "./little-heart-purple-right.png";
import Cursor from "../../Cursor";
import Toggle from "react-toggle";
import "react-toggle/style.css";

const MainLayout : React.FC = () => {
	useNavigate();
	const location = useLocation();

	const [isSticky, setIsSticky] = useState<boolean>(false);

	const [cursor, setCursor] = useState<boolean>(false);

	const handleCursor = () => {
		setCursor(cursor => !cursor);
	};
 
	useEffect(() => {
		// if (window.scrollY >= 500) {
		//     setIsSticky(true)
		// } else if (window.scrollY < 500) {
		//   setIsSticky(false)
		// }

		window.addEventListener("scroll", () => {
			const current = window.scrollY;

			if (current < 700 || current > 5600) {
				setIsSticky(false);
			} else if (current >= 500 && !isSticky) {
				setIsSticky(true);
			}
		});
	}, [isSticky]);

	const [main, setMain] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect((): void => {
		if (location.pathname === "/" || location.pathname === "/politics") {
			setMain(true);
		}
		else if (location.pathname === "/isloading" || location.pathname === "/98") {
			setLoading(true);
		}

		else if (location.pathname !== "/") {
			setMain(false);
		}
	}, [location]);


	useEffect(() => {
		const cursorStyle = !cursor ? "" : "none !important";

		document.documentElement.style.cssText = `cursor: ${cursorStyle}`;
		document.body.style.cssText = `cursor: ${cursorStyle}`;
	}, [cursor]);
	

	return (
		<>
			{cursor ? <Cursor/> : ""}
			<div className={styles.toggle}>
				<h3>Включить пиздатый курсор?</h3>
				<Toggle defaultChecked={cursor} onChange={handleCursor}/>
			</div>
			<div className={`${main ? styles.mainStyle : ""} ${styles.layout}`}>
				<div className={`${main ? styles.hearts : "disabled"}`}>
					<div className={`${styles.heart} ${loading ? "disabled" : ""}`}>
						<img src={heartPink} className={styles.heartLittle} style={randomPoz1} alt=""/>
						<img src={heartPinkRight} className={styles.heartLittle} style={randomPoz2} alt=""/>
						<img src={heartPurple} className={styles.heartLittle} style={randomPoz3} alt=""/>
						<img src={heartPurpleRight} className={styles.heartLittle} style={randomPoz4} alt=""/>
						<img src={heartPink} className={styles.heartLittle} style={randomPoz5} alt=""/>
						<img src={heartPinkRight} className={styles.heartLittle} style={randomPoz6} alt=""/>
						<img src={heartPurple} className={styles.heartLittle} style={randomPoz7} alt=""/>
						<img src={heartPurpleRight} className={styles.heartLittle} style={randomPoz8} alt=""/>
						<img src={heartPink} className={styles.heartLittle} style={randomPoz9} alt=""/>
						<img src={heartPinkRight} className={styles.heartLittle} style={randomPoz10} alt=""/>
						<img src={heartPurple} className={styles.heartLittle} style={randomPoz11} alt=""/>
						<img src={heartPurpleRight} className={styles.heartLittle} style={randomPoz12} alt=""/>
					</div>
				</div>
				<header className={`${loading ? "disabled" : ""} ${isSticky ? styles.sticky : ""}`}>
					<Header/>
				</header>
				<Outlet/>
				<div className={`${loading ? "disabled" : ""}`}>
					<Footer/>
				</div>
			</div>
		</>
	);
};

export default MainLayout;