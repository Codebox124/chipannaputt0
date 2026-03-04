// components/ShopifyBuyButton.tsx
'use client'

import { useEffect, useState, useRef } from 'react'

export default function ShopifyBuyButton() {
    const [isLoading, setIsLoading] = useState(true)
    const initialized = useRef(false)

    useEffect(() => {
        // Prevent double initialization if the component remounts quickly or in Strict Mode
        if (initialized.current) return;

        const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js'
        const nodeId = 'product-component-1772577405689'

        function ShopifyBuyInit() {
            // Check again inside the async flow
            if (initialized.current) return;

            const node = document.getElementById(nodeId);
            if (!node) return;

            // Clear the node to prevent double rendering
            node.innerHTML = '';
            initialized.current = true;

            const client = (window as any).ShopifyBuy.buildClient({
                domain: 'nq5qk0-y0.myshopify.com',
                storefrontAccessToken: '655b2a344880b20aae83f89babd0884c',
            })

            const ui = (window as any).ShopifyBuy.UI.init(client);

            (window as any).ShopifyBuy.UI.onReady(client).then(function () {
                ui.createComponent('product', {
                    id: '7247127380101',
                    node: node,
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
                });
                setIsLoading(false);
            })
        }

        function loadScript() {
            if (document.querySelector(`script[src="${scriptURL}"]`)) {
                ShopifyBuyInit();
                return;
            }
            const script = document.createElement('script')
            script.async = true
            script.src = scriptURL
            document.head.appendChild(script)
            script.onload = ShopifyBuyInit
        }

        if ((window as any).ShopifyBuy && (window as any).ShopifyBuy.UI) {
            ShopifyBuyInit()
        } else {
            loadScript()
        }

        // Cleanup function
        return () => {
            // We don't reset initialized.current here because we want to stick to the ID
            // but we might want to clear the node on unmount if we don't want it persisting
            const node = document.getElementById(nodeId);
            if (node) node.innerHTML = '';
            initialized.current = false;
        }
    }, [])

    return (
        <div className="w-full min-h-[400px] flex items-center justify-center relative">
            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10">
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-500 font-medium animate-pulse">Loading Store...</p>
                </div>
            )}
            <div id='product-component-1772577405689' className="w-full"></div>
        </div>
    )
}
