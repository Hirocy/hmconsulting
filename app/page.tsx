"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import {
  ArrowRight,
  ChevronRight,
  BarChart3,
  Lightbulb,
  Users,
  FileText,
  ArrowLeft,
  KeyIcon as Strategy,
  Briefcase,
  MessageCircle,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Handshake,
  Rocket,
  CheckCircle,
  ChevronLeft,
  Info,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function Home() {
  const achievementsRef = useRef<HTMLDivElement>(null)
  const advisorsRef = useRef<HTMLDivElement>(null)
  const [showPopover, setShowPopover] = useState<number | null>(null)

  // 過去の実績データ
  const achievements = [
    {
      id: 1,
      title: "大手製造業A社",
      image: "/placeholder.svg?height=200&width=400",
      description:
        "既存事業の技術を活用した新規サービス事業の立ち上げを支援。市場調査から事業計画策定、プロトタイプ開発まで一貫してサポートし、1年で黒字化を実現。",
      details:
        "製造業A社は、長年ハードウェア製品を提供してきましたが、サブスクリプションモデルへの移行を検討していました。当社は、市場調査、競合分析、顧客インタビューを実施し、新サービスの価値提案を策定。プロトタイプ開発から市場投入まで支援し、1年で黒字化を達成しました。特に、組織内の抵抗を克服するための変革マネジメントが成功の鍵となりました。",
    },
    {
      id: 2,
      title: "IT企業B社",
      image: "/placeholder.svg?height=200&width=400",
      description:
        "新規事業部門の組織構築と人材育成を支援。スタートアップのような意思決定スピードと、大企業のリソースを活かした組織設計により、3ヶ月で新サービスをローンチ。",
      details:
        "IT企業B社は、新規事業開発のための専門部門を立ち上げようとしていましたが、既存の組織文化との融合に課題を抱えていました。当社は、スタートアップのアジリティと大企業のリソースを両立させる組織設計を提案。人材採用基準の策定、評価制度の設計、意思決定プロセスの最適化を行い、わずか3ヶ月で新サービスのローンチに成功しました。",
    },
    {
      id: 3,
      title: "金融機関C社",
      image: "/placeholder.svg?height=200&width=400",
      description:
        "フィンテック領域での新規事業開発を支援。市場調査、競合分析、顧客インタビューを通じて、独自のポジショニングを確立し、半年で1万ユーザーを獲得。",
      details:
        "金融機関C社は、デジタル化の波に乗り遅れないよう、フィンテックサービスの開発を急いでいました。当社は、徹底的な市場調査と顧客インサイトの分析を通じて、競合との差別化ポイントを特定。ユーザー体験を中心に据えたサービス設計と、段階的なローンチ戦略の策定により、半年で1万ユーザーの獲得に成功しました。規制対応と革新性のバランスが評価されています。",
    },
    {
      id: 4,
      title: "小売業D社",
      image: "/placeholder.svg?height=200&width=400",
      description:
        "オムニチャネル戦略の策定と実行を支援。実店舗とオンラインの融合により、顧客体験を向上させ、売上を30%増加。",
      details:
        "小売業D社は、ECサイトを運営していましたが、実店舗との連携が不十分でした。当社は、顧客ジャーニーを再設計し、オンラインとオフラインの接点を増やす戦略を策定。在庫管理システムの統合、店舗スタッフのデジタルトレーニング、パーソナライズされたマーケティング施策の導入により、顧客満足度と売上の大幅な向上を実現しました。",
    },
    {
      id: 5,
      title: "ヘルスケア企業E社",
      image: "/placeholder.svg?height=200&width=400",
      description:
        "デジタルヘルスケアサービスの開発と市場投入を支援。医療機関との連携モデルを構築し、2年で市場シェア15%を獲得。",
      details:
        "ヘルスケア企業E社は、従来の医療機器メーカーでしたが、デジタルヘルスケア市場への参入を目指していました。当社は、規制対応、医療機関のニーズ分析、患者体験の設計を総合的に支援。特に、医療機関との協業モデルの構築が成功の鍵となり、2年という短期間で市場シェア15%を獲得する成果を上げました。",
    },
    {
      id: 6,
      title: "教育機関F社",
      image: "/placeholder.svg?height=200&width=400",
      description:
        "オンライン教育プラットフォームの開発を支援。従来の対面授業とデジタル学習の融合により、受講者数が2倍に増加。",
      details:
        "教育機関F社は、コロナ禍でオンライン教育への移行を迫られていました。当社は、単なるオンライン化ではなく、対面授業の強みとデジタル学習の利点を融合させたハイブリッドモデルを提案。学習効果の測定方法、教員のデジタルスキル向上、コミュニティ形成の仕組みづくりを支援し、受講者数と満足度の大幅な向上を実現しました。",
    },
    {
      id: 7,
      title: "エネルギー企業G社",
      image: "/placeholder.svg?height=200&width=400",
      description:
        "再生可能エネルギー事業への参入を支援。市場分析、技術評価、パートナーシップ構築を通じて、3年で事業規模を10倍に拡大。",
      details:
        "エネルギー企業G社は、従来の化石燃料中心のビジネスから、再生可能エネルギー事業への転換を図っていました。当社は、技術評価、市場機会の特定、規制動向の分析を通じて、最適な参入戦略を策定。特に、技術パートナーとの協業モデル構築と、段階的な投資計画の策定により、リスクを抑えながら事業規模を急速に拡大することに成功しました。",
    },
    {
      id: 8,
      title: "物流企業H社",
      image: "/placeholder.svg?height=200&width=400",
      description:
        "ラストワンマイル配送の新サービス開発を支援。AI活用による配送最適化と顧客体験の向上により、配送コスト20%削減と顧客満足度向上を実現。",
      details:
        "物流企業H社は、Eコマースの急成長に伴い、ラストワンマイル配送の効率化と差別化を課題としていました。当社は、AI技術を活用した配送ルート最適化システムの開発と、顧客とのコミュニケーション改善策を提案。パイロット地域での実証実験を経て、全国展開を支援し、配送コストの削減と顧客満足度の向上という両立が難しい目標を達成しました。",
    },
  ]

  // 外部顧問データ
  const advisors = [
    {
      id: 1,
      name: "佐藤 健太",
      position: "テクノロジー戦略アドバイザー",
      image: "/placeholder.svg?height=150&width=150",
      bio: "元大手IT企業CTO。AI、ブロックチェーン、クラウドコンピューティングの専門家。スタートアップ5社の技術顧問を務める。",
      expertise: ["AI戦略", "テクノロジーロードマップ", "デジタルトランスフォーメーション"],
      social: { twitter: "#", linkedin: "#" },
    },
    {
      id: 2,
      name: "鈴木 美咲",
      position: "マーケティングストラテジスト",
      image: "/placeholder.svg?height=150&width=150",
      bio: "グローバル消費財企業のマーケティング責任者を経て独立。デジタルマーケティングとブランド戦略の専門家。",
      expertise: ["ブランド戦略", "デジタルマーケティング", "消費者インサイト分析"],
      social: { twitter: "#", linkedin: "#", instagram: "#" },
    },
    {
      id: 3,
      name: "田中 誠一",
      position: "財務・資金調達アドバイザー",
      image: "/placeholder.svg?height=150&width=150",
      bio: "投資銀行出身のファイナンス専門家。ベンチャーキャピタルでの投資経験を持ち、累計50社以上の資金調達を支援。",
      expertise: ["資金調達戦略", "財務モデリング", "バリュエーション"],
      social: { linkedin: "#" },
    },
    {
      id: 4,
      name: "渡辺 直樹",
      position: "組織開発コンサルタント",
      image: "/placeholder.svg?height=150&width=150",
      bio: "人材開発・組織変革の専門家。大手コンサルティングファームでの経験を活かし、スタートアップから大企業まで組織構築を支援。",
      expertise: ["組織設計", "人材育成", "チームビルディング"],
      social: { twitter: "#", linkedin: "#" },
    },
    {
      id: 5,
      name: "伊藤 由美",
      position: "UX/UIデザインディレクター",
      image: "/placeholder.svg?height=150&width=150",
      bio: "グローバルテック企業でのプロダクトデザイン経験を持つデザイナー。ユーザー中心設計の第一人者として多くの製品開発に携わる。",
      expertise: ["UXリサーチ", "プロダクトデザイン", "デザインシステム構築"],
      social: { twitter: "#", instagram: "#", linkedin: "#" },
    },
    {
      id: 6,
      name: "小林 拓也",
      position: "法務・知財アドバイザー",
      image: "/placeholder.svg?height=150&width=150",
      bio: "IT・知的財産権専門の弁護士。スタートアップの法務支援から大企業の知財戦略まで幅広く対応。",
      expertise: ["知的財産戦略", "契約法務", "コンプライアンス"],
      social: { linkedin: "#" },
    },
    {
      id: 7,
      name: "加藤 真理",
      position: "グローバル展開ストラテジスト",
      image: "/placeholder.svg?height=150&width=150",
      bio: "外資系コンサルティングファーム出身。アジア・北米市場への展開戦略の専門家として多くの日本企業の海外進出を支援。",
      expertise: ["海外市場分析", "グローバル展開戦略", "クロスカルチャーマネジメント"],
      social: { twitter: "#", linkedin: "#" },
    },
    {
      id: 8,
      name: "山本 健太郎",
      position: "サステナビリティ戦略アドバイザー",
      image: "/placeholder.svg?height=150&width=150",
      bio: "環境コンサルティング企業の創業者。サステナブル経営と社会的インパクト評価の専門家として企業のESG戦略を支援。",
      expertise: ["ESG戦略", "サステナブルビジネスモデル", "インパクト評価"],
      social: { twitter: "#", linkedin: "#" },
    },
    {
      id: 9,
      name: "中村 洋子",
      position: "ヘルスケアイノベーション専門家",
      image: "/placeholder.svg?height=150&width=150",
      bio: "医師としての経験を持ち、ヘルステック企業の創業・経営を経験。医療とテクノロジーの融合による新規事業開発を支援。",
      expertise: ["ヘルステック", "規制対応", "医療機関連携モデル"],
      social: { twitter: "#", linkedin: "#" },
    },
    {
      id: 10,
      name: "木村 大輔",
      position: "デジタルトランスフォーメーション推進役",
      image: "/placeholder.svg?height=150&width=150",
      bio: "大手企業のDX責任者を経て独立。レガシー企業のデジタル変革を得意とし、技術と組織の両面からDXを推進。",
      expertise: ["DX戦略", "レガシーシステム刷新", "デジタル組織構築"],
      social: { twitter: "#", linkedin: "#" },
    },
  ]

  // 横スクロール制御関数
  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth
      ref.current.scrollTo({ left: scrollTo, behavior: "smooth" })
    }
  }

  // 自動スクロール
  useEffect(() => {
    const achievementsInterval = setInterval(() => {
      if (achievementsRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = achievementsRef.current
        if (scrollLeft + clientWidth >= scrollWidth) {
          achievementsRef.current.scrollTo({ left: 0, behavior: "smooth" })
        } else {
          achievementsRef.current.scrollTo({ left: scrollLeft + clientWidth, behavior: "smooth" })
        }
      }
    }, 8000)

    const advisorsInterval = setInterval(() => {
      if (advisorsRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = advisorsRef.current
        if (scrollLeft + clientWidth >= scrollWidth) {
          advisorsRef.current.scrollTo({ left: 0, behavior: "smooth" })
        } else {
          advisorsRef.current.scrollTo({ left: scrollLeft + clientWidth, behavior: "smooth" })
        }
      }
    }, 10000)

    return () => {
      clearInterval(achievementsInterval)
      clearInterval(advisorsInterval)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold text-xl flex items-center">
              <span className="text-primary">H&M</span>
              <span className="text-black ml-1">Consulting</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#services" className="text-sm font-medium hover:text-primary transition-colors">
              サービス
            </Link>
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              特徴
            </Link>
            <Link href="#service-details" className="text-sm font-medium hover:text-primary transition-colors">
              サービス詳細
            </Link>
            <Link href="#cases" className="text-sm font-medium hover:text-primary transition-colors">
              実績
            </Link>
            <Link href="#representative" className="text-sm font-medium hover:text-primary transition-colors">
              代表紹介
            </Link>
            <Link href="#advisors" className="text-sm font-medium hover:text-primary transition-colors">
              パートナー
            </Link>
            <Link href="#collaboration" className="text-sm font-medium hover:text-primary transition-colors">
              協業・連携
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Globe className="h-4 w-4 mr-1" />
              EN
            </Button>
            <Link href="#contact" className="hidden md:block">
              <Button className="rounded-full">お問い合わせ（無料）</Button>
            </Link>
            <Button variant="outline" size="icon" className="md:hidden rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
              <span className="sr-only">メニューを開く</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    新規事業開発の<span className="text-primary">壁</span>を<br />
                    共に乗り越える
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    貴社の挑戦を阻む「3つの壁」、組織・リソース・スキル。
                    <br />
                    私と共に、その壁を乗り越え、新たな成長を実現しませんか？
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="#contact">
                    <Button
                      variant="outline"
                      className="w-full rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      お問い合わせ（無料）
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=550&width=550"
                  width={550}
                  height={550}
                  alt="ビジネスコンサルティングイメージ - 会議中のビジネスパーソン"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">このような課題がありませんか？</h1>
                <div className="h-1 w-20 bg-primary mx-auto mt-2 mb-6"></div>
                <p className="text-gray-500 mt-2">10年以上の経験で当方が経験してきた担当者の実体験です。</p>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="border-none shadow-lg bg-white">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mr-4">
                        <Strategy className="h-8 w-8" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">
                          戦略はあるのだが、実行する方法がわからない。手段がない
                        </h4>
                        <p className="text-gray-600">
                          ビジョンや戦略は明確に描けているものの、具体的な実行計画や必要なリソースの調達方法がわからず、前に進めない状況に陥っています。
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mr-4">
                        <Users className="h-8 w-8" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">新規事業開発を実践したことのある経験者がいない</h4>
                        <p className="text-gray-600">
                          社内に新規事業の立ち上げ経験を持つ人材がおらず、何から始めればよいのか、どのような課題が待ち受けているのかの予測ができません。
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mr-4">
                        <BarChart3 className="h-8 w-8" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">
                          評価制度・報酬設計が無く（緩く）、担当者が損をする仕組みになっている
                        </h4>
                        <p className="text-gray-600">
                          新規事業のリスクを取る担当者に対する適切な評価や報酬の仕組みがなく、失敗した場合のキャリアリスクばかりが目立ち、挑戦する人材が現れません。
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="challenges" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">事業開発を阻む「3つの障壁」</h2>
                <div className="h-1 w-20 bg-primary mx-auto mt-2 mb-6"></div>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  多くの企業が新規事業開発において直面する共通の課題。これらを社外のリソースを活用し、乗り越えることが成功への鍵です。
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="transform transition-all duration-500 hover:scale-105 hover:shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    組織の壁
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    縦割り構造と意思決定の遅延。官僚的な組織文化や複雑な承認プロセスが、革新的なアイデアの実現を阻害していませんか？
                  </p>
                  <ul className="space-y-2 text-xs text-gray-500">
                    <li>• 承認手続きの煩雑化による開発遅延</li>
                    <li>• 部署間調整に時間がかかる組織構造</li>
                    <li>• 現場アイデアが組織階層で埋もれる問題</li>
                    <li>• 既存プロセスの硬直化</li>
                    <li>• 過度なリスク回避による挑戦の停滞</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="transform transition-all duration-500 hover:scale-105 hover:shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    リソースの壁
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    限られた資源と優先順位。既存事業とのバランスを取りながら、新規事業にリソースを割り当てるのは困難な課題です。
                  </p>
                  <ul className="space-y-2 text-xs text-gray-500">
                    <li>• 主力事業重視によるリソース不足</li>
                    <li>• 既存事業とのシナジー偏重</li>
                    <li>• 専任体制が組めない人員配置</li>
                    <li>• 短期成果へのプレッシャー</li>
                    <li>• 資金調達の社内ハードル</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="transform transition-all duration-500 hover:scale-105 hover:shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Lightbulb className="h-5 w-5 text-primary" />
                    </div>
                    スキルの壁
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    変化への対応と人材育成。新規事業の成功には、既存のスキルセットに加えて、変化への対応力や起業家精神が不可欠です。
                  </p>
                  <ul className="space-y-2 text-xs text-gray-500">
                    <li>• 起業家精神の希薄化</li>
                    <li>• 新規事業経験者・ノウハウの不足</li>
                    <li>• 新しいスキル習得機会の不足</li>
                    <li>• 適切なKPI設定のミスマッチ</li>
                    <li>• 新市場ニーズへの対応力不足</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">新規事業開発を成功に導くサービス</h2>
                <div className="h-1 w-20 bg-primary mx-auto mt-2 mb-6"></div>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  戦略策定から実行支援まで、新規事業開発の全プロセスをサポートします。
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl py-12 space-y-16">
              {/* サービス 1 */}
              <div className="relative">
                <div className="absolute left-0 top-0 -mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold shadow-lg">
                  01
                </div>
                <div className="ml-8 pl-12 border-l-2 border-primary/20">
                  <Card className="border-none shadow-lg">
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <Strategy className="h-8 w-8 text-primary mr-3" />
                        <CardTitle className="text-2xl">新規事業開発戦略コンサルティング</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500 mb-4">
                        御社の強みと市場機会を徹底的に分析し、競争優位性を確立するための戦略を策定します。
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>市場調査・分析：最新の市場トレンド、競合状況、顧客ニーズを深く理解</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>事業機会探索：潜在的な事業機会を洗い出し、市場規模、成長性、収益性などを評価</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>
                            戦略策定：ターゲット市場、顧客セグメント、バリュープロポジション、収益モデルなどを明確化
                          </span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>ビジネスモデル構築：持続可能な収益を生み出すためのビジネスモデルを設計</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* サービス 2 */}
              <div className="relative">
                <div className="absolute left-0 top-0 -mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold shadow-lg">
                  02
                </div>
                <div className="ml-8 pl-12 border-l-2 border-primary/20">
                  <Card className="border-none shadow-lg">
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <Briefcase className="h-8 w-8 text-primary mr-3" />
                        <CardTitle className="text-2xl">事業開発業務支援</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500 mb-4">
                        戦略策定にとどまらず、新規事業の立ち上げ、運営をハンズオンで支援します。
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>
                            プロトタイプ開発：MVP（Minimum Viable Product）を迅速に開発し、市場での検証をサポート
                          </span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>PoC（Proof of Concept）：開発したプロトタイプを用いて、市場での実現可能性を検証</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>事業計画策定：投資家や社内承認を得るための、詳細な事業計画を作成</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>組織構築：新規事業に必要なチームを組成し、採用、育成を支援</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* サービス 3*/}
              <div className="relative">
                <div className="absolute left-0 top-0 -mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold shadow-lg">
                  03
                </div>
                <div className="ml-8 pl-12 border-l-2 border-primary/20">
                  <Card className="border-none shadow-lg">
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <MessageCircle className="h-8 w-8 text-primary mr-3" />
                        <CardTitle className="text-2xl">壁打ちアドバイザリー</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500 mb-4">
                        経験豊富なアドバイザーとして、新規事業開発に関するあらゆる相談に応じます。（月額5万円～）
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>アイデアのブラッシュアップ：新規事業のアイデアを深掘りし、実現可能性を高める</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>戦略の評価・改善：既存の事業戦略を評価し、改善点を提案</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>意思決定のサポート：新規事業に関する重要な意思決定をサポート</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>
                            チームのメンタリング：新規事業チームのメンバーをメンタリングし、スキルアップを支援
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <Link href="#contact">
                <Button
                  variant="outline"
                  className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                >
                  お問い合わせ（無料）
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">他者との違い・サービスの特徴</h2>
                <div className="h-1 w-20 bg-primary mx-auto mt-2 mb-6"></div>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  事業開発10年以上の実務経験により、事業売却経験を踏まえ、下記の提供をお約束します。
                  <br />
                  第3者の外部コンサルタントのように、助言と資料提出だけでなく、共同創業者の立ち位置で不確実性を一緒に悩みながら、手を動かし稼働することでご支援を致します。
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl py-12 space-y-8">
              {/* 特徴1 */}
              <Card className="border-none shadow-lg bg-white">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-xl font-bold mr-4">
                      1
                    </div>
                    <div className="flex items-center">
                      <Handshake className="h-8 w-8 text-primary mr-3" />
                      <h3 className="text-2xl font-bold">共創と伴走（コラボレーションとサポート）</h3>
                    </div>
                  </div>
                  <div className="ml-16">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>共創型アプローチ: クライアントと共に作り上げる姿勢。</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>伴走パートナー: クライアントの目標達成に向けて共に走る関係。</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>コラボレーティブ・ワーク: 協力的な作業。</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>共に汗をかく: クライアントの「蒸気」を「原動力」に変える、実践型支援。</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>寄り添い、共に試行錯誤する: 不確実な状況を共に乗り越える。</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* 特徴2 */}
              <Card className="border-none shadow-lg bg-white">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-xl font-bold mr-4">
                      2
                    </div>
                    <div className="flex items-center">
                      <Rocket className="h-8 w-8 text-primary mr-3" />
                      <h3 className="text-2xl font-bold">未来とイノベーション（創造と革新）</h3>
                    </div>
                  </div>
                  <div className="ml-16">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>未来志向: 新しい未来を築くことへのフォーカス。</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>イノベーション推進: 革新を進めるサポート。</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>不確実性こそチャンス: 蒸気のように湧き上がるアイデアを事業へ。</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>御社の蒸気のような潜在力を開花: 潜在力を引き出し、未来を創り上げる。</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* 特徴3 */}
              <Card className="border-none shadow-lg bg-white">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-xl font-bold mr-4">
                      3
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-8 w-8 text-primary mr-3" />
                      <h3 className="text-2xl font-bold">実践と信頼（具体性と結果重視）</h3>
                    </div>
                  </div>
                  <div className="ml-16">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>柔軟対応: 不確実な状況に柔軟に適応。</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>ハンズオン支援: 実際に手を動かす具体的サポート。</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>問題解決志向: 課題解決に注力。</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>アジャイルメンタリング: 柔軟なプロジェクト進行サポート。</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>不確実性を受け入れ、共に成長する: 新規事業開発のプロフェッショナル。</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
            <div className="mt-8 text-center">
              <Link href="#contact">
                <Button
                  variant="outline"
                  className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                >
                  お問い合わせ（無料）
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="service-details" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">サービス詳細</h2>
                <div className="h-1 w-20 bg-primary mx-auto mt-2 mb-6"></div>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  H&M Consultingは、新規事業開発に特化した個人コンサルティング支援です。
                </p>
              </div>
            </div>

            <div className="relative w-full overflow-hidden bg-white shadow-md rounded-lg mb-12">
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="font-medium">自己紹介資料.pdf</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="rounded-full p-1 hover:bg-gray-100">
                    <ArrowLeft className="h-5 w-5 text-gray-500" />
                  </button>
                  <span className="text-sm text-gray-500">1 / 5</span>
                  <button className="rounded-full p-1 hover:bg-gray-100">
                    <ArrowRight className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4">
                {[1, 2, 3, 4, 5].map((slide) => (
                  <div key={slide} className="snap-center flex-shrink-0 w-full px-4">
                    <div className="bg-gray-100 rounded-lg aspect-[4/3] flex items-center justify-center">
                      <Image
                        src={`/placeholder.svg?height=600&width=800&text=サービス詳細スライド${slide}`}
                        width={800}
                        height={600}
                        alt={`サービス詳細スライド ${slide}`}
                        className="rounded-lg object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link href="#contact">
                <Button
                  variant="outline"
                  className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                >
                  お問い合わせ（無料）
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="cases" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">過去の実績</h2>
                <div className="h-1 w-20 bg-primary mx-auto mt-2 mb-6"></div>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  私は多くの企業の新規事業開発を支援してきました。その一部をご紹介します。
                </p>
              </div>
            </div>

            <div className="relative mt-12">
              <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white shadow-md border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => scroll(achievementsRef, "left")}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </div>

              <div
                ref={achievementsRef}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 px-4 space-x-6"
              >
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="snap-center flex-shrink-0 w-full max-w-sm">
                    <Card className="transform transition-all duration-500 hover:scale-105 hover:shadow-lg h-full">
                      <CardHeader>
                        <Image
                          src={achievement.image || "/placeholder.svg"}
                          width={400}
                          height={200}
                          alt={achievement.title}
                          className="rounded-lg object-cover w-full h-48"
                        />
                      </CardHeader>
                      <CardContent>
                        <CardTitle className="mb-2">{achievement.title}</CardTitle>
                        <CardDescription className="text-sm text-gray-500">{achievement.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="flex flex-col space-y-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="link" className="text-primary text-sm flex items-center p-0">
                              詳細を見る
                              <Info className="ml-1 h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80 p-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{achievement.title} - 詳細情報</h4>
                              </div>
                              <p className="text-sm text-gray-500">{achievement.details}</p>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </CardFooter>
                    </Card>
                  </div>
                ))}
              </div>

              <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white shadow-md border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => scroll(achievementsRef, "right")}
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link href="#contact">
                <Button
                  variant="outline"
                  className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                >
                  お問い合わせ（無料）
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="representative" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">代表紹介</h2>
                <div className="h-1 w-20 bg-primary mx-auto mt-2 mb-6"></div>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  新規事業開発の経験豊富なプロフェッショナルが、貴社の挑戦をサポートします。
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl py-12">
              <Card className="transform transition-all duration-500 hover:shadow-lg">
                <div className="md:flex">
                  <div className="md:w-1/4 p-6 flex justify-center">
                    <div className="relative h-64 w-64 rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=256&width=256"
                        width={256}
                        height={256}
                        alt="代表"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-3/4 p-6">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-3xl">山田 太郎</CardTitle>
                      <CardDescription className="text-xl text-primary font-medium">
                        新規事業開発コンサルタント / H&M Consulting 代表
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-4">
                        <p className="text-gray-600 leading-relaxed">
                          大手IT企業で新規事業開発責任者を務めた後、2018年に独立。20年以上の新規事業開発経験を持ち、これまでに50社以上の企業の新規事業立ち上げを支援してきました。特に、組織変革とイノベーション文化の醸成に強みを持ち、大企業からスタートアップまで幅広い企業の新規事業開発をサポートしています。
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                          前職では、年商1000億円規模の企業において新規事業部門を統括し、3つの新規事業を黒字化まで導いた実績があります。その中の1つは事業売却により、投資額の5倍のリターンを実現しました。この経験から、新規事業開発における「組織の壁」「リソースの壁」「スキルの壁」の重要性を深く理解し、現在のコンサルティングサービスの基盤となっています。
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                          著書に「大企業発イノベーションの作り方」「新規事業開発の教科書」があり、多くの企業研修や講演でも登壇。
                        </p>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </div>
            <div className="mt-8 text-center">
              <Link href="#contact">
                <Button
                  variant="outline"
                  className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                >
                  お問い合わせ（無料）
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="advisors" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">外部顧問・パートナー</h2>
                <div className="h-1 w-20 bg-primary mx-auto mt-2 mb-6"></div>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  各分野の専門家が、貴社の新規事業を強力にサポートします。
                </p>
              </div>
            </div>

            <div className="relative mt-12">
              <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white shadow-md border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => scroll(advisorsRef, "left")}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </div>

              <div
                ref={advisorsRef}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 px-4 space-x-6"
              >
                {advisors.map((advisor) => (
                  <div key={advisor.id} className="snap-center flex-shrink-0 w-full max-w-sm">
                    <Card className="transform transition-all duration-500 hover:scale-105 hover:shadow-lg h-full">
                      <CardHeader>
                        <Image
                          src={advisor.image || "/placeholder.svg"}
                          width={150}
                          height={150}
                          alt={advisor.name}
                          className="rounded-lg object-cover w-full h-32"
                        />
                      </CardHeader>
                      <CardContent>
                        <CardTitle className="mb-2">{advisor.name}</CardTitle>
                        <CardDescription className="text-sm text-gray-500">{advisor.position}</CardDescription>
                      </CardContent>
                      <CardFooter className="flex flex-col space-y-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="link" className="text-primary text-sm flex items-center p-0">
                              詳細を見る
                              <Info className="ml-1 h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80 p-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{advisor.name} - 詳細情報</h4>
                              </div>
                              <p className="text-sm text-gray-500">{advisor.bio}</p>
                              <div className="mt-2">
                                <h5 className="font-medium">専門分野</h5>
                                <ul className="list-disc pl-5 text-sm text-gray-500">
                                  {advisor.expertise.map((expertise, index) => (
                                    <li key={index}>{expertise}</li>
                                  ))}
                                </ul>
                              </div>
                              <div className="mt-2">
                                <h5 className="font-medium">ソーシャル</h5>
                                <div className="flex space-x-2">
                                  {advisor.social?.twitter && (
                                    <Link href={advisor.social.twitter} target="_blank" rel="noopener noreferrer">
                                      <Twitter className="h-4 w-4 text-gray-500 hover:text-primary" />
                                    </Link>
                                  )}
                                  {advisor.social?.linkedin && (
                                    <Link href={advisor.social.linkedin} target="_blank" rel="noopener noreferrer">
                                      <Linkedin className="h-4 w-4 text-gray-500 hover:text-primary" />
                                    </Link>
                                  )}
                                  {advisor.social?.instagram && (
                                    <Link href={advisor.social.instagram} target="_blank" rel="noopener noreferrer">
                                      <Instagram className="h-4 w-4 text-gray-500 hover:text-primary" />
                                    </Link>
                                  )}
                                  {advisor.social?.facebook && (
                                    <Link href={advisor.social.facebook} target="_blank" rel="noopener noreferrer">
                                      <Facebook className="h-4 w-4 text-gray-500 hover:text-primary" />
                                    </Link>
                                  )}
                                  {advisor.social?.youtube && (
                                    <Link href={advisor.social.youtube} target="_blank" rel="noopener noreferrer">
                                      <Youtube className="h-4 w-4 text-gray-500 hover:text-primary" />
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </CardFooter>
                    </Card>
                  </div>
                ))}
              </div>

              <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white shadow-md border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => scroll(advisorsRef, "right")}
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link href="#contact">
                <Button
                  variant="outline"
                  className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                >
                  お問い合わせ（無料）
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="collaboration" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">協業・連携をお考えの企業様へ</h2>
                <div className="h-1 w-20 bg-primary mx-auto mt-2 mb-6"></div>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  H&M Consultingでは、共に成長を目指せる企業様との協業・連携を積極的に進めています。
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl py-12">
              <Card className="transform transition-all duration-500 hover:shadow-lg">
                <div className="p-6">
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-3xl">協業・連携のメリット</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-4">
                      <p className="text-gray-600 leading-relaxed">
                        H&M Consultingとの協業・連携により、貴社は以下のメリットを享受できます。
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 leading-relaxed">
                        <li>新規事業開発の加速</li>
                        <li>顧客基盤の拡大</li>
                        <li>専門知識・ノウハウの共有</li>
                        <li>ブランド力の向上</li>
                        <li>新たな収益源の創出</li>
                      </ul>
                      <p className="text-gray-600 leading-relaxed">
                        特に、新規事業開発においては、H&M
                        Consultingの豊富な経験と実績が、貴社の事業成功に大きく貢献します。
                      </p>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
            <div className="mt-8 text-center">
              <Link href="#contact">
                <Button
                  variant="outline"
                  className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                >
                  お問い合わせ（無料）
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">お問い合わせ</h2>
                <div className="h-1 w-20 bg-primary mx-auto mt-2 mb-6"></div>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  新規事業に関するご相談、協業のご提案など、お気軽にお問い合わせください。
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl">
              <Card className="border-none shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">お問い合わせフォーム</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">お名前</Label>
                      <input type="text" id="name" placeholder="山田 太郎" className="border rounded-md px-3 py-2" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">メールアドレス</Label>
                      <input
                        type="email"
                        id="email"
                        placeholder="taro.yamada@example.com"
                        className="border rounded-md px-3 py-2"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="message">お問い合わせ内容</Label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="ご質問やご相談内容をご記入ください"
                        className="border rounded-md px-3 py-2"
                      />
                    </div>
                    <Button className="rounded-full">送信</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-white">
        <div className="container flex flex-col items-center justify-between space-y-4 py-6 md:flex-row md:space-y-0">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            © 2024 H&M Consulting. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <Link href="#" className="hover:text-primary">
              プライバシーポリシー
            </Link>
            <Link href="#" className="hover:text-primary">
              利用規約
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
