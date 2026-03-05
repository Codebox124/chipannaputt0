// components/ShopifyBuyButton.tsx
'use client'

import { useEffect, useState } from 'react'

export default function ShopifyBuyButton() {
    const [isLoading, setIsLoading] = useState(true)

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

                ; (window as any).ShopifyBuy.UI.onReady(client).then(function (ui: any) {
                    ui.createComponent('product', {
                        id: '7247127380101',
                        node: document.getElementById('product-component-1772577405689'),
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
                            "option": {},
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

                    // Wait for product to render in DOM
                    const checkInterval = setInterval(() => {
                        const container = document.getElementById('product-component-1772577405689')
                        // Check if the container has children (product rendered)
                        if (container && container.children.length > 0) {
                            clearInterval(checkInterval)
                            // Add small delay to ensure images load
                            setTimeout(() => {
                                setIsLoading(false)
                            }, 500)
                        }
                    }, 100) // Check every 100ms

                    // Fallback: hide spinner after 5 seconds max
                    setTimeout(() => {
                        clearInterval(checkInterval)
                        setIsLoading(false)
                    }, 5000)
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

    return (
        <div className=" px-10 md:px-16 lg:px-24 relative min-h-[400px]">
            {/* Loading Spinner */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600 font-medium">Loading product...</p>
                    </div>
                </div>
            )}

            {/* Shopify Product */}
            <div
                id='product-component-1772577405689'
                className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            />
        </div>
    )
}