
export interface IEmployeeManager {
    checkLimitTotal(employeeId: number, totalValue: number, key: string): Promise<void>;
    checkLimitRange(employeeId: number, totalValue: number, keyFrom: string, keyTo: string): Promise<void>;
}
