import {useState, useEffect} from "react";
import {Box, Button, Image, Layer, Nav, Sidebar, Text} from "grommet";
import {
    Menu as MenuFeather,
    Home as HomeFeather,
    List as ListFeather,
    BookOpen as BookOpenFeather,
    Shield as ShieldFeather,
    X as XFeather,
    Edit3 as Edit3Feather
} from "react-feather";

import Dashboard from "./Dashboard/Dashboard";
import ModLog from "./Dashboard/ModLog";
import StrikeList from "./Dashboard/StrikeList";
import Rules from "./Dashboard/Rules";

export default function NavigationBar({setCurrentPage}) {
    const [showSidebar, setShowSidebar] = useState(true);
    const [showGuide, setShowGuide] = useState(false);

    function changeSidebar(event) {
        event.preventDefault();
        if (process.browser) localStorage.setItem("showSidebar", `${!showSidebar}`);
        setShowSidebar(!showSidebar);
    }

    useEffect(() => {
        if (process.browser) {
            const storageSidebar = localStorage.getItem("showSidebar");
            if (storageSidebar) setShowSidebar(JSON.parse(storageSidebar));
        }
    }, []);

    return (
        <div style={{height: "100%"}}>
            {
                showSidebar ?
                    <Sidebar width="15vw" background="brand"
                             header={<Text align="start" textAlign="center">Hololive Resistance Discord<br/>Staff
                                 Dashboard
                                 <hr/>
                             </Text>}
                             footer={<Button height="xxsmall" label={<MenuFeather/>} onClick={changeSidebar}/>}
                    >
                        <Nav gap="medium" align="start" pad={{horizontal: "medium", vertical: "none"}}>
                            <Button icon={<HomeFeather size={30}/>} label="Dashboard" plain
                                    onClick={() => setCurrentPage(<Dashboard/>)}/>
                            <Button icon={<ListFeather size={30}/>} label="Strike list" plain
                                    onClick={() => setCurrentPage(<StrikeList/>)}/>
                            <Button icon={<svg xmlns="http://www.w3.org/2000/svg" width="30.849" height="30.849"
                                               viewBox="0 0 30.849 30.849">
                                <path id="Icon_metro-hammer" data-name="Icon metro-hammer"
                                      d="M33,29.515,16.475,14.469l.769-.771a3.528,3.528,0,0,0,1.022-2.278c.03-.014.06-.027.089-.043l3.1-1.94A1.305,1.305,0,0,0,21.389,7.7l-5.4-5.411a1.3,1.3,0,0,0-1.728-.069L12.33,5.336c-.016.029-.03.059-.043.09A3.509,3.509,0,0,0,10.015,6.45L7.08,9.393a3.527,3.527,0,0,0-1.022,2.278c-.03.014-.06.028-.089.044l-3.1,1.94a1.305,1.305,0,0,0,.069,1.732l5.4,5.411a1.3,1.3,0,0,0,1.728.069l1.935-3.111c.016-.029.03-.059.043-.089a3.509,3.509,0,0,0,2.271-1.024l.852-.855L30.167,32.359a1.035,1.035,0,0,0,1.49.172l1.517-1.521A1.042,1.042,0,0,0,33,29.515Z"
                                      transform="translate(-2.571 -1.928)" fill="#fff"/>
                            </svg>} label="Modlog" plain onClick={() => setCurrentPage(<ModLog/>)}/>
                            <Button icon={<BookOpenFeather size={30}/>} label="Rules" plain
                                    onClick={() => setCurrentPage(<Rules/>)}/>
                            <Button icon={<ShieldFeather size={30}/>} label="Guide" plain
                                    onClick={() => setShowGuide(true)}/>
                        </Nav>
                    </Sidebar>
                    :
                    <Sidebar width="xsmall" background="brand"
                             header={<><Image alignSelf="start" src="/img/logo.png" alt="Logo"
                                              style={{maxWidth: "60px", margin: "auto", width: "100%"}}/>
                                 <div>
                                     <hr/>
                                 </div>
                             </>}
                             footer={<Button width="xxsmall" label={<MenuFeather/>} onClick={changeSidebar}/>}
                    >
                        <Nav gap="small">
                            <Button icon={<HomeFeather size={47}/>} onClick={() => setCurrentPage(<Dashboard/>)}/>
                            <Button icon={<ListFeather size={47}/>} onClick={() => setCurrentPage(<StrikeList/>)}/>
                            <Button icon={<svg xmlns="http://www.w3.org/2000/svg" width="30.849" height="30.849"
                                               viewBox="0 0 30.849 30.849" style={{width: "2.2vw", height: "auto"}}>
                                <path id="Icon_metro-hammer" data-name="Icon metro-hammer"
                                      d="M33,29.515,16.475,14.469l.769-.771a3.528,3.528,0,0,0,1.022-2.278c.03-.014.06-.027.089-.043l3.1-1.94A1.305,1.305,0,0,0,21.389,7.7l-5.4-5.411a1.3,1.3,0,0,0-1.728-.069L12.33,5.336c-.016.029-.03.059-.043.09A3.509,3.509,0,0,0,10.015,6.45L7.08,9.393a3.527,3.527,0,0,0-1.022,2.278c-.03.014-.06.028-.089.044l-3.1,1.94a1.305,1.305,0,0,0,.069,1.732l5.4,5.411a1.3,1.3,0,0,0,1.728.069l1.935-3.111c.016-.029.03-.059.043-.089a3.509,3.509,0,0,0,2.271-1.024l.852-.855L30.167,32.359a1.035,1.035,0,0,0,1.49.172l1.517-1.521A1.042,1.042,0,0,0,33,29.515Z"
                                      transform="translate(-2.571 -1.928)" fill="#fff"/>
                            </svg>} onClick={() => setCurrentPage(<ModLog/>)}/>
                            <Button icon={<BookOpenFeather size={47}/>} onClick={() => setCurrentPage(<Rules/>)}/>
                            <Button icon={<ShieldFeather size={47}/>} onClick={() => setShowGuide(true)}/>
                        </Nav>
                    </Sidebar>
            }
            {showGuide && (
                <Layer onEsc={() => setShowGuide(false)} onClickOutside={() => setShowGuide(false)} full={true}>
                    <div>
                        <Button icon={<XFeather size={30}/>} onClick={() => setShowGuide(false)}/>
                        <Button style={{float: "right"}} icon={<Edit3Feather size={30}/>} onClick={() => {
                            window.open("https://docs.google.com/document/d/1LBglncCnvfcTibdrobqOChpDt6AFkabFw-aL2cpneqM/edit?usp=sharing")
                        }}/>
                    </div>
                    <Box align="center" fill={true}>
                        <iframe style={{height: "100%", width: "auto", minWidth: "44vw", display: "block"}}
                                src="https://docs.google.com/document/d/e/2PACX-1vT_43LUii1r3yPotlhgOzXvhItInd8_j9QrR5LKjpZuONSjk_DC1OcdhQPFQCmJh6Z55aViVVjf8ISP/pub?embedded=true"/>
                    </Box>
                </Layer>
            )}
        </div>
    );
}