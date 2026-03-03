// components/ShopifyBuyButton.tsx
'use client'

import { useEffect } from 'react'

export default function ShopifyBuyButton() {
    useEffect(() => {
        const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js'
        
        function loadScript() {
            const script = document.createElement('script')
            script.async = true
            script.src = scriptURL
            document.head.appendChild(script)
            script.onload = ShopifyBuyInit
        }

        function ShopifyBuyInit() {
            const client = (window as any).ShopifyBuy.buildClient({
                domain: 'nq5qk0-y0.myshopify.com',
                storefrontAccessToken: '655b2a344880b20aae83f89babd0884c',
            })

            const ui = (window as any).ShopifyBuy.UI.init(client);

            ;(window as any).ShopifyBuy.UI.onReady(client).then(function () {
                ui.createComponent('product', {
                    id: '7247127380101',
                    node: document.getElementById('product-component-1772577405689'),
                    toggles: [{ node: document.getElementById('custom-cart-toggle') }],
                    moneyFormat: '%24%7B%7Bamount%7D%7D',
                    options: {
                        "product": {
                            "styles": {
                                "product": {
                                    "@media (min-width: 601px)": {
                                        "max-width": "100%",
                                        "margin-left": "0",
                                        "margin-bottom": "50px"
                                    },
                                    "text-align": "left"
                                },
                                "title": {
                                    "font-size": "26px"
                                },
                                "button": {
                                    ":hover": {
                                        "background-color": "#000000"
                                    },
                                    "background-color": "#000000",
                                    ":focus": {
                                        "background-color": "#000000"
                                    }
                                },
                                "price": {
                                    "font-size": "18px"
                                },
                                "compareAt": {
                                    "font-size": "15.299999999999999px"
                                },
                                "unitPrice": {
                                    "font-size": "15.299999999999999px"
                                }
                            },
                            "layout": "horizontal",
                            "contents": {
                                "img": false,
                                "imgWithCarousel": true,
                                "button": false,
                                "buttonWithQuantity": true,
                                "description": true
                            },
                            "width": "100%",
                            "text": {
                                "button": "Add to cart"
                            }
                        },
                        "productSet": {
                            "styles": {
                                "products": {
                                    "@media (min-width: 601px)": {
                                        "margin-left": "-20px"
                                    }
                                }
                            }
                        },
                        "modalProduct": {
                            "contents": {
                                "img": false,
                                "imgWithCarousel": true,
                                "button": false,
                                "buttonWithQuantity": true
                            },
                            "styles": {
                                "product": {
                                    "@media (min-width: 601px)": {
                                        "max-width": "100%",
                                        "margin-left": "0px",
                                        "margin-bottom": "0px"
                                    }
                                },
                                "button": {
                                    ":hover": {
                                        "background-color": "#000000"
                                    },
                                    "background-color": "#000000",
                                    ":focus": {
                                        "background-color": "#000000"
                                    }
                                },
                                "title": {
                                    "font-family": "Helvetica Neue, sans-serif",
                                    "font-weight": "bold",
                                    "font-size": "26px",
                                    "color": "#4c4c4c"
                                },
                                "price": {
                                    "font-family": "Helvetica Neue, sans-serif",
                                    "font-weight": "normal",
                                    "font-size": "18px",
                                    "color": "#4c4c4c"
                                },
                                "compareAt": {
                                    "font-family": "Helvetica Neue, sans-serif",
                                    "font-weight": "normal",
                                    "font-size": "15.299999999999999px",
                                    "color": "#4c4c4c"
                                },
                                "unitPrice": {
                                    "font-family": "Helvetica Neue, sans-serif",
                                    "font-weight": "normal",
                                    "font-size": "15.299999999999999px",
                                    "color": "#4c4c4c"
                                }
                            },
                            "text": {
                                "button": "Add to cart"
                            }
                        },
                        "option": {
                            
                        },
                        "cart": {
                            "styles": {
                                "button": {
                                    ":hover": {
                                        "background-color": "#000000"
                                    },
                                    "background-color": "#000000",
                                    ":focus": {
                                        "background-color": "#000000"
                                    }
                                }
                            },
                            "text": {
                                "total": "Subtotal",
                                "button": "Checkout"
                            }
                        },
                        "toggle": {
                            
                            "styles": {
                                "toggle": {
                                    "background-color": "#000000",
                                    ":hover": {
                                        "background-color": "#000000"
                                    },
                                    ":focus": {
                                        "background-color": "#000000"
                                    }
                                }
                            }
                        }
                    },
                })
            })
        }

        if ((window as any).ShopifyBuy) {
            if ((window as any).ShopifyBuy.UI) {
                ShopifyBuyInit()
            } else {
                loadScript()
            }
        } else {
            loadScript()
        }
    }, [])

    return <div id='product-component-1772577405689'></div>
}