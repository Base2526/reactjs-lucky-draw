import React, { Component } from "react";
import Confetti from "react-dom-confetti";
import TextLoop from "react-text-loop";
import { Helmet } from "react-helmet";
import { Button, Grid } from "tabler-react";

import "./Home.css";
import DrawForm from "../../components/DrawForm";
import PreviouslyDrawnItemsBlock from "../../components/PreviouslyDrawnItemsBlock";
import SiteWrapper from "../../SiteWrapper";
import "tabler-react/dist/Tabler.css";
import { REVIEW } from "../Json-ld";

import { text } from './content.txt';

const style = {
  drawForm: {
    width: "100%",
  },
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      drawItems: [],
      currentItems: [],
      pastDrawnItems: [],
      result: "",
      showTextAnimation: true,
      removeDrawnItem: false,
      animationInterval: 150,
      showResult: false,
      disableDrawButton: false,
      value: "",
      placeholder: "ใส่รายการผู้เข้าร่วมทั้งหมด. One item per line.",
      valid: false,
      touched: false,
      validationRules: {
        minLength: 3,
        isRequired: true,
      },
    };


    

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSkipAnimationChange = this.handleSkipAnimationChange.bind(this);
    this.handleRemoveDrawnItemChange = this.handleRemoveDrawnItemChange.bind(
      this
    );
  }

  UNSAFE_componentWillMount (){
    console.log('UNSAFE_componentWillMount', text)

    // fetch('content.txt').then()

    // fetch('./content.txt')
    //   // .then(response => response)
    //   .then((response) => {
    //     return response.text();
    //  })
    //   .then(data => {

    //     console.log("data", data)

    //     })
    //     .catch(err => console.log('xx', err));

   // Show Error When Use Fetch Method With Import Method
// fetch(text).then(function(response) {
//   return response
// }).then(function(data) {
// console.log(data)
//  return data
// }).then(function(Normal) {
//  console.log(Normal.text)
// //  document.getElementById("app").innerHTML = Normal;
// }).catch(function(err) {
//  console.log('Fetch problem show: ' + err.message);
// });

let _this = this

     fetch("./content.txt").then(
      function(res){
      return res.text()
    }).then(function(data){
    // store Data in State Data Variable
      // setData(data)

      // console.log(data)

      // let formInputItems = "1\n2\n";
    let formInputItems = data;
    let itemList = formInputItems.split("\n");

    console.log(itemList)
    _this.setState({
      ..._this.state,
      value: formInputItems,
      drawItems: formInputItems,
      items: itemList,
      currentItems: itemList,
    });
    }).catch(
      function(err){
        console.log(err, ' error')
      }
    )


    
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.drawItems.length > 2) {
      let formInputItems = this.state.drawItems;
      let itemList = formInputItems.split("\n");

      console.log(itemList)
      this.setState({
        ...this.state,
        items: itemList,
        currentItems: itemList,
      });
    }
  }

  handleChange(e) {
    this.setState({ [e.name]: e.value });
  }

  handleSkipAnimationChange = () => {
    this.setState({ showTextAnimation: !this.state.showTextAnimation });
  };

  handleRemoveDrawnItemChange = () => {
    this.setState({ removeDrawnItem: !this.state.removeDrawnItem });
  };

  sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  randomDrawItem = () => {
    const { currentItems, showTextAnimation, removeDrawnItem } = this.state;
    this.setState({
      ...this.state,
      showResult: false,
      disableDrawButton: true,
    });

    let maxItemIndex = currentItems.length;
    const randomIndex = Math.floor(Math.random() * maxItemIndex);
    this.sleep(showTextAnimation ? 3000 : 0).then(() => {
      this.setState({
        ...this.state,
        result: currentItems[randomIndex],
        pastDrawnItems: [
          ...this.state.pastDrawnItems,
          currentItems[randomIndex],
        ],
        showResult: true,
        disableDrawButton: false,
      });
    });
    if (removeDrawnItem) {
      const copyCurrentItems = [...this.state.currentItems];
      copyCurrentItems.splice(randomIndex, 1);
      this.setState({
        currentItems: copyCurrentItems,
      });
    }
  };

  render() {
    const {
      value,
      items,
      drawItems,
      currentItems,
      result,
      disableDrawButton,
      pastDrawnItems,
      placeholder,
      showResult,
    } = this.state;

    // console.log('drawItems : ', drawItems.length, typeof drawItems )
    // let drawItems = "1\n2\n";
    return (
      <SiteWrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <script type="application/ld+json">{REVIEW}</script>
        </Helmet>
        {items.length !== 0 && (
          <div className="draw-block">
            <Grid.Row>
              <Grid.Col md={6} sm={12}>
                <div className="draw-section">
                  {!showResult && items && (
                    <TextLoop
                      className="draw-text"
                      interval={50}
                      springConfig={{ stiffness: 180, damping: 8 }}
                      children={items}
                    />
                  )}
                  <Confetti active={this.state.showResult} />
                  {showResult && result}
                </div>
                <Button
                  pill
                  block
                  name="drawButton"
                  className="randomButton"
                  color="success"
                  onClick={this.randomDrawItem}
                  disabled={disableDrawButton || currentItems.length <= 1}
                >
                  {disableDrawButton ? "กำลังสุ่มผู้โชคดี..." : "สุ่มผู้โชคดี"}
                </Button>
              </Grid.Col>
              <Grid.Col md={6} sm={12}>
                <PreviouslyDrawnItemsBlock pastDrawnItems={pastDrawnItems} />
              </Grid.Col>
            </Grid.Row>
          </div>
        )}
        <Grid.Row>
          <Grid.Col xs={6} md={12}>
            <DrawForm
              value={value}
              drawItems={drawItems}
              onSubmit={this.handleSubmit}
              handleSkipAnimationChange={this.handleSkipAnimationChange}
              handleRemoveDrawnItemChange={this.handleRemoveDrawnItemChange}
              onChange={this.handleChange}
              placeholder={placeholder}
              style={style.drawForm}
            />
          </Grid.Col>
        </Grid.Row>
        {/* <hr /> */}
        {/* <Grid.Row>
          <Grid.Col xs={12} md={8}>
            <h2>Sponsors</h2>
            <p>Special thanks to the following companies.</p>
            <h3>
              Platinum Tier
              <Button
                href="https://www.buymeacoffee.com/jasonkam"
                target="_blank"
                outline
                size="sm"
                RootComponent="a"
                color="primary"
                className="contribute-button"
              >
                Contribute
              </Button>
            </h3>
            <p>Contribute $300 or more to be featured.</p>
          </Grid.Col>
        </Grid.Row> */}
        {/* <Grid.Row>
          <Grid.Col xs={12} md={3}>
            <a href="https://www.ecembroid.com">
              <img
                src="https://luckydraw.me/images/ecembroid.png"
                alt="ECEmbroid"
              />
              <h3>ECEmbroid</h3>
            </a>
          </Grid.Col>
          <Grid.Col xs={12} md={3}>
            <a href="http://theroofingspecialist.sg/">
              <img
                src="https://luckydraw.me/images/theroofingspecialist.png"
                alt="JKRoof"
              />
              <h3>The Roofing Specialist</h3>
            </a>
          </Grid.Col>
          <Grid.Col xs={12} md={3}>
            <a href="https://www.jkroof.com.sg/">
              <img src="https://luckydraw.me/images/JKRoof.png" alt="JKRoof" />
              <h3>J&K Roof Contractors</h3>
            </a>
          </Grid.Col>
        </Grid.Row> */}
        {/* <hr /> */}
        {/* <Grid.Row>
          <Grid.Col xs={12} md={6}>
            <h2>What Our Users Say</h2>
            <div class="powr-reviews" id="83081483_1602856389"></div>
          </Grid.Col>
          <Grid.Col xs={12} md={6}>
            <div
              class="fb-page"
              data-href="https://www.facebook.com/luckydraw.me/"
              data-tabs="timeline"
              data-width=""
              data-height=""
              data-small-header="true"
              data-adapt-container-width="true"
              data-hide-cover="false"
              data-show-facepile="true"
            >
              <blockquote
                cite="https://www.facebook.com/luckydraw.me/"
                class="fb-xfbml-parse-ignore"
              >
                <a href="https://www.facebook.com/luckydraw.me/">
                  LuckyDraw.me
                </a>
              </blockquote>
            </div>
          </Grid.Col>
        </Grid.Row> */}
      </SiteWrapper>
    );
  }
}

export default App;
