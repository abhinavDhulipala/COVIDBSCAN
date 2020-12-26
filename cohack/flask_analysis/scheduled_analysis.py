import datetime
from itertools import combinations

from geopy.distance import geodesic
from matplotlib import pyplot as plt
from pandas import DataFrame
from sklearn.cluster import DBSCAN
from sklearn.datasets import make_blobs

PRODUCTION = False


class Analyze:

    def __init__(self):
        self.cache = None
        self.timestamp = None
        self.most_up_to_date_cluster = None

    def in_mem_analysis(self):
        # Take the biggest cities and cites of hot spots. Assume hot spots primarily come from cities.
        # For suburbs use cities as centers and increase variance

        centers, stds, samples = [], [], []

        # City of Greely + surrounding suburbs (weld county)
        centers.append((40.542390, -79.157280))
        stds.append(.1)
        centers.append((40.542390, -79.157280))
        samples.append(int(5500 // 10))
        stds.append(.2)
        samples.append(int(755 // 10))
        # Thornton Adams county
        centers.append((39.868042, -104.971924))
        stds.append(.1)
        samples.append(int(12000 // 10))
        centers.append((39.868042, -104.971924))
        stds.append(.2)
        samples.append(int((14411 - 6000) // 10))
        # Araphoe county
        centers.append((36.970890, -93.717979))
        stds.append(.15)
        samples.append(900)
        centers.append((36.970890, -93.717979))
        stds.append(.3)
        samples.append(1305 - 900)
        # Boulder
        centers.append((40.016202, -105.270353))
        stds.append(.1)
        samples.append(400)
        centers.append((40.016202, -105.270353))
        stds.append(.2)
        samples.append(566 - 400)
        # broomfield
        centers.append((39.911665, -105.052883))
        stds.append(.2)
        samples.append(99)
        # denver
        centers.append((39.727325, -104.973980))
        stds.append(.1)
        samples.append(1300)
        centers.append((39.727325, -104.973980))
        stds.append(.3)
        samples.append(1854 - 1300)

        # el paso county
        centers.append((38.832283, -100.821753))
        stds.append(.1)
        samples.append(1041)

        X, _ = make_blobs(n_samples=samples, centers=centers, cluster_std=stds)
        df = DataFrame(dict(x=X[:, 0], y=X[:, 1]))
        fig, ax = plt.subplots(figsize=(8, 8))
        df.plot(ax=ax, kind='scatter', x='x', y='y')
        plt.xlabel('Long')
        plt.ylabel('Lat')
        plt.show()
        clustering = DBSCAN(eps=.5, min_samples=20).fit(X)
        cluster = clustering.labels_
        df = DataFrame(dict(x=X[:, 0], y=X[:, 1], label=cluster))
        group = df.groupby('label')
        independent_clusters = {}
        # map label to coords
        df_dict = df.to_dict('label')
        for lat, lon, label in zip(df_dict['x'], df_dict['y'], df_dict['label']):
            if label not in independent_clusters:
                independent_clusters[label] = [(lat, lon)]
            else:
                independent_clusters[label].append((lat, lon))

        def square_distance(x, y):
            return sum([(xi - yi) ** 2 for xi, yi in zip(x, y)])

        """:return center and radius"""

        def max_dist(A):
            max_square_distance = 0
            max_pair = None
            for pair in combinations(A, 2):
                if square_distance(*pair) > max_square_distance:
                    max_square_distance = square_distance(*pair)
                    max_pair = pair
            try:
                center = [(cord1 + cord2) / 2 for cord1, cord2 in zip(*max_pair)]
            except ValueError or TypeError:
                return None

            return center, float(str(geodesic(*max_pair))[:-3]) if max_pair is not None else None

        most_up_to_date_cluster = list(
            map(lambda key: max_dist(independent_clusters[key]), independent_clusters.keys()))
        print(most_up_to_date_cluster)
        return most_up_to_date_cluster

    def latest(self):
        if self.cache:
            return self.cache
        self.cache = self.in_mem_analysis()
        self.timestamp = datetime.datetime.now()
        return self.cache


    def prod_analysis(self):
        pass


SINGELTON = Analyze()

