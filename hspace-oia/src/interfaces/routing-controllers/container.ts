export interface UseContainerOptions {
    fallback?: boolean;

    fallbackOnErrors?: boolean;
}

export type ClassConstructor<T> = new (...args: any[]) => T;

const defaultContainer: { get<T>(someClass: ClassConstructor<T> | any): T } = new (class {
    private instances: { type: any, object: any }[] = [];

    get<T>(someClass: ClassConstructor<T>): T {
        let instance = this.instances.find((obj: any) => obj.type === someClass);
        if (!instance) {
            instance = { type: someClass, object: new someClass() };
            this.instances.push(instance);
        }

        return instance.object;
    }
})();

let userContainer: {
    get<T>(
      someClass: ClassConstructor<T> | any,
    ): T
};
let userContainerOptions: UseContainerOptions;


export interface IocAdapter {
    get<T>(someClass: ClassConstructor<T>): T;
}

export function useContainer(iocAdapter: IocAdapter, options?: UseContainerOptions) {
    userContainer = iocAdapter;
    userContainerOptions = options;
}

export function getFromContainer<T>(
  someClass: ClassConstructor<T> | any,
): unknown {
    if (userContainer) {
        try {
            const instance = userContainer.get(someClass);
            if (instance)
                return instance;

            if (!userContainerOptions || !userContainerOptions.fallback)
                return instance;

        } catch (error) {
            if (!userContainerOptions || !userContainerOptions.fallbackOnErrors)
                throw error;
        }
    }
    return defaultContainer.get<T>(someClass);
}
