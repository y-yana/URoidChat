# -*- coding: utf-8 -*-
import cv2
import numpy as np

# 減色処理


def sub_color(src, K):
    # 次元数を1落とす
    Z = src.reshape((-1, 3))

    # float32型に変換
    Z = np.float32(Z)

    # 基準の定義
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 10, 1.0)

    # K-means法で減色
    ret, label, center = cv2.kmeans(
        Z, K, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)

    # UINT8に変換
    center = np.uint8(center)

    res = center[label.flatten()]

    # 配列の次元数と入力画像と同じに戻す
    return res.reshape((src.shape))


def anime_filter(img, K):
    # グレースケール変換
    gray = cv2.cvtColor(img, cv2.COLOR_BGRA2GRAY)

    # ぼかしでノイズ低減
    edge = cv2.blur(gray, (3, 3))

    # Cannyアルゴリズムで輪郭抽出
    edge = cv2.Canny(edge, 50, 150, apertureSize=3)

    # 輪郭画像をRGB色空間に変換
    edge = cv2.cvtColor(edge, cv2.COLOR_GRAY2BGR)

    # 画像の領域分割
    img = sub_color(img, K)

    # 差分を返す
    return cv2.subtract(img, edge)


def image_transform(path):
    # 入力画像の読み込み
    img = cv2.imread(path)

    # 画像のアニメ絵化
    anime = anime_filter(img, 30)

    # 結果出力
    cv2.imwrite(path, anime)

if __name__ == '__main__':
    image_transform()